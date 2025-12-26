import { Album } from "../entities/Album";
import { Artist } from "../entities/Artist";
import { Track } from "../entities/Track"
import LoginService from "./login-service";

const getAccessToken = () => {
  // First try to get from storage (authorization code flow)
  const storedToken = LoginService.getStoredToken();
  if (storedToken) {
    return storedToken;
  }
  // Fallback to hash (implicit grant flow)
  const params = LoginService.getParamsAfterLoginRedirect();
  return params.access_token || "";
};

const mostRecentlyPlayedEndpoint = 'https://api.spotify.com/v1/me/player/recently-played?limit=50';

const getSpotifyGETRequest = () => {
  const accessToken = getAccessToken();
  return {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  };
};

const getArtistEndpoint = (timeRange) => {
    switch (timeRange){
      case 'SHORT': 
        return 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50&offset=0';
      case 'MEDIUM': 
        return  'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50&offset=0';
      case 'LONG': 
        return 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0';
      default: 
        return  'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50&offset=0';
    };
  };

const getTrackEndpoint = (timeRange) => {
    switch (timeRange){
        case 'SHORT': 
        return 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50&offset=0';
        case 'MEDIUM': 
        return  'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=0';
        case 'LONG': 
        return 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0';
        default: 
        return  'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=0';
    };
};

const generateArtistListString = (artists) => {
    let artistsList = [];
    artists.forEach((artist) => {
      artistsList.push(artist.name);
    });
    return artistsList.join(", ");  
};

const generateTimeString = (timeInMilliseconds) => {
    const timeAsDate = new Date(Date.UTC(0,0,0,0,0,0,timeInMilliseconds)),
    timeAsDateParts = [timeAsDate.getUTCMinutes(), timeAsDate.getUTCSeconds()];
    return timeAsDateParts.map(s => String(s).padStart(2,'0')).join(':');

}

const createArtistObject = (artistAPIObject) => {
    const artistObject = Artist(
        artistAPIObject.id,
        artistAPIObject.name,
        artistAPIObject.images,
        artistAPIObject.genres,
        artistAPIObject.followers.total,
        artistAPIObject.popularity,
        artistAPIObject.uri,
        artistAPIObject.external_urls.spotify
    );  
    return artistObject;
}

const createTrackObject = (trackAPIObject) => {
    const albumObject = createAlbumObjectFromTrack(trackAPIObject);
    const artistsAsString = generateArtistListString(trackAPIObject.artists);
    const durationAsString = generateTimeString(trackAPIObject.duration_ms);
    const previewURL = (!!trackAPIObject.preview_url ? trackAPIObject.preview_url : ""); //Spotify API preview url can be null. This avoids that nightmare
    const trackObject = Track(
        trackAPIObject.id,
        trackAPIObject.name,
        durationAsString,
        artistsAsString,
        trackAPIObject.album.images,
        albumObject,
        trackAPIObject.popularity,
        trackAPIObject.explicit,
        previewURL,
        trackAPIObject.uri,
        trackAPIObject.external_urls.spotify
    );
    return trackObject;
}

const createAlbumObjectFromTrack = (trackAPIObject) => {
    const artistsAsString = generateArtistListString(trackAPIObject.artists);
    const albumObject = Album(
        trackAPIObject.album.id,
        trackAPIObject.album.name,
        trackAPIObject.album.release_date,
        trackAPIObject.album.album_type,
        trackAPIObject.album.total_tracks,
        trackAPIObject.album.images,
        trackAPIObject.genres,
        artistsAsString,
        trackAPIObject.popularity,
        trackAPIObject.album.uri,
        trackAPIObject.album.external_urls.spotify
    );
    return albumObject;
};

const SpotifyAPIService = {
    getUserTopArtists: async function(timeRange){
        let userTopArtists = [];
        await fetch(getArtistEndpoint(timeRange), getSpotifyGETRequest())
            .then(response => response.json())
            .then((responseJSON) => { 
                responseJSON.items.forEach(artistItem => {
                    const artistObject = createArtistObject(artistItem);
                    userTopArtists.push(artistObject);  
                })
            });
        return userTopArtists;
    },

    getUserTopTracks: async function(timeRange){
        let userTopTracks = [];
        await fetch(getTrackEndpoint(timeRange), getSpotifyGETRequest())
            .then(response => response.json())
            .then((responseJSON) => { 
                responseJSON.items.forEach(trackItem => {
                    const trackObject = createTrackObject(trackItem);
                    userTopTracks.push(trackObject);  
                })
            });
        return userTopTracks;
    },

    getUserMostRecentPlayed: async function(){
        let userMostRecentlyPlayed = [];
        await fetch(mostRecentlyPlayedEndpoint, getSpotifyGETRequest())
            .then(response => response.json())
            .then((responseJSON) => { 
                responseJSON.items.forEach((RecentlyPlayedItem) => {
                    const trackObject = createTrackObject(RecentlyPlayedItem.track);
                    userMostRecentlyPlayed.push(trackObject);  
                })
            });
        return userMostRecentlyPlayed;
    }
};

export default SpotifyAPIService;