import LoginService from "./login-service";

const accessToken = LoginService.getParamsAfterLoginRedirect().access_token;
const mostRecentlyPlayedEndpoint = 'https://api.spotify.com/v1/me/player/recently-played?limit=50';

const spotifyGETRequest = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
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

const SpotifyAPIService = {
    getUserTopArtists: async function(timeRange){
        let userTopArtists = [];
        await fetch(getArtistEndpoint(timeRange), spotifyGETRequest)
            .then(response => response.json())
            .then((responseJSON) => { 
                responseJSON.items.forEach(artistItem => {
                    userTopArtists.push({"id": artistItem.id, "name": artistItem.name});  
                })
            });
        return userTopArtists;
    },

    getUserTopTracks: async function(timeRange){
        let userTopTracks = [];
        await fetch(getTrackEndpoint(timeRange), spotifyGETRequest)
            .then(response => response.json())
            .then((responseJSON) => { 
                responseJSON.items.forEach(trackItem => {
                    const artistsListString = generateArtistListString(trackItem.artists);
                    userTopTracks.push({"id": trackItem.id, "name": trackItem.name, "artist": artistsListString});  
                })
            });
        return userTopTracks;
    },

    getUserMostRecentPlayed: async function(){
        let userMostRecentlyPlayed = [];
        await fetch(mostRecentlyPlayedEndpoint, spotifyGETRequest)
            .then(response => response.json())
            .then((responseJSON) => { 
                responseJSON.items.forEach((trackItem) => {
                    const artistsListString = generateArtistListString(trackItem.track.artists);
                    userMostRecentlyPlayed.push({"id": trackItem.track.id, "name": trackItem.track.name, "artist": artistsListString});  
                })
            });
        return userMostRecentlyPlayed;
    }
};

export default SpotifyAPIService;