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
    getUserTopArtists: function(timeRange){
        let userTopArtists = [];
        fetch(getArtistEndpoint(timeRange), spotifyGETRequest)
            .then(response => response.json())
            .then((responseJSON) => { 
                responseJSON.items.forEach(artistItem => {
                    userTopArtists.push({"id": artistItem.id, "name": artistItem.name});  
                })
            });
        return userTopArtists;
    },

    getUserTopTracks: function(timeRange){
        let userTopTracks = [];
        fetch(getTrackEndpoint(timeRange), spotifyGETRequest)
            .then(response => response.json())
            .then((responseJSON) => { 
                responseJSON.items.forEach(trackItem => {
                    const artistsListString = generateArtistListString(trackItem.artists);
                    userTopTracks.push({"id": trackItem.id, "name": trackItem.name, "artist": artistsListString});  
                })
            });
        return userTopTracks;
    },

    getUserMostRecentTracks: function(){
        let userMostRecentTracks = [];
        fetch(mostRecentlyPlayedEndpoint, spotifyGETRequest)
            .then(response => response.json())
            .then((responseJSON) => { 
                responseJSON.items.forEach((trackItem, index) => {
                    const artistsListString = generateArtistListString(trackItem.track.artists);
                    userMostRecentTracks.push({"id": trackItem.track.id.concat(index), "name": trackItem.track.name, "artist": artistsListString});  
                })
            });
        return userMostRecentTracks;
    }
};

export default SpotifyAPIService;