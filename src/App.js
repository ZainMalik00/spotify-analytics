import './App.css';
import { useState, useEffect } from 'react';


const CLIENT_ID = "1b82855ba97c408590be267aa16378b2";
const SPOTIFY_AUTH = "https://accounts.spotify.com/authorize?";
const REDIRECT_URI = "https://zainmalik00.github.io/spotify-analytics/";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-top-read", "user-read-recently-played"];
const SCOPES_URL = SCOPES.join(SPACE_DELIMITER);


function App() {
  const [userTopArtistsShortTerm, setUserTopArtistsShortTerm] = useState([]);
  const [userTopArtistsMediumTerm, setUserTopArtistsMediumTerm] = useState([]);
  const [userTopArtistsLongTerm, setUserTopArtistsLongTerm] = useState([]);
  const [userTopTracksShortTerm, setUserTopTracksShortTerm] = useState([]);
  const [userTopTracksMediumTerm, setUserTopTracksMediumTerm] = useState([]);
  const [userTopTracksLongTerm, setUserTopTracksLongTerm] = useState([]);
  const [userMostRecentTracks, setUserMostRecentTracks] = useState([]);

  useEffect(() => {
    document.title = 'Spotify Analytics';
    if(window.location.hash) {
      const spotifyAccessParams = getParamsAfterLoginRedirect(window.location.hash);
      if(spotifyAccessParams.access_token.length != 0){
        updateUserTopArtists(spotifyAccessParams.access_token, 'SHORT');
        updateUserTopArtists(spotifyAccessParams.access_token, 'MEDIUM');
        updateUserTopArtists(spotifyAccessParams.access_token, 'LONG');
        updateUserTopTracks(spotifyAccessParams.access_token, 'SHORT');
        updateUserTopTracks(spotifyAccessParams.access_token, 'MEDIUM');
        updateUserTopTracks(spotifyAccessParams.access_token, 'LONG');
        updateUserMostRecentTracks(spotifyAccessParams.access_token);
      }
    }
  }, [])

  const loginRedirect = () => {
    window.location = `${SPOTIFY_AUTH}client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=token&show_dialog=true`;
  }

  const getParamsAfterLoginRedirect = (hash) => {
    return( 
      hash.substring(1)
        .split("&")
        .reduce((accumulator, currentParam) => {
          const [key, value] = currentParam.split("=");
          accumulator[key] = value;
          return accumulator;
        }, {})   
    );
  }

  const getArtistEndpoint = (timeRange) => {
    switch (timeRange){
      case 'SHORT': return 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50&offset=0';
        break;
      case 'MEDIUM': return  'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50&offset=0';
        break;
      case 'LONG': return 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0';
        break;
      default: return  'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50&offset=0';
        break;
    };
  };

  const getTrackEndpoint = (timeRange) => {
    switch (timeRange){
      case 'SHORT': return 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50&offset=0';
        break;
      case 'MEDIUM': return  'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=0';
        break;
      case 'LONG': return 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0';
        break;
      default: return  'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=0';
        break;
    };
  };

  const appendUserTopArtistsState = (artist, timeRange) => {
    switch (timeRange){
      case 'SHORT':
        setUserTopArtistsShortTerm(userTopArtistsShortTerm => [...userTopArtistsShortTerm, {"id": artist.id, "name": artist.name}]);
        break;
      case 'MEDIUM':
        setUserTopArtistsMediumTerm(userTopArtistsMediumTerm => [...userTopArtistsMediumTerm, {"id": artist.id, "name": artist.name}]);
        break;
      case 'LONG':
        setUserTopArtistsLongTerm(userTopArtistsLongTerm => [...userTopArtistsLongTerm, {"id": artist.id, "name": artist.name}]);
        break;
      default:
        setUserTopArtistsMediumTerm(userTopArtistsMediumTerm => [...userTopArtistsMediumTerm, {"id": artist.id, "name": artist.name}]);
        break;
    };
  };

  const appendUserTopTracksState = (track, artistsListString, timeRange) => {
    switch (timeRange){
      case 'SHORT':
        setUserTopTracksShortTerm(userTopTracksShortTerm => [...userTopTracksShortTerm, {"id": track.id, "name": track.name, "artist": artistsListString}]);
        break;
      case 'MEDIUM':
        setUserTopTracksMediumTerm(userTopTracksMediumTerm => [...userTopTracksMediumTerm, {"id": track.id, "name": track.name, "artist": artistsListString}]);
        break;
      case 'LONG':
        setUserTopTracksLongTerm(userTopTracksLongTerm => [...userTopTracksLongTerm, {"id": track.id, "name": track.name, "artist": artistsListString}]);
        break;
      default:
        setUserTopTracksMediumTerm(userTopTracksMediumTerm => [...userTopTracksMediumTerm, {"id": track.id, "name": track.name, "artist": artistsListString}]);
        break;
    };
  };

  const generateArtistListString = (artists) => {
    let artistsList = [];
    artists.forEach((artist) => {
      artistsList.push(artist.name);
    });
    return artistsList.join(", ");  
  };

  const updateUserTopArtists = (spotifyAccessToken, timeRange) => {
    let artistEndpoint = getArtistEndpoint(timeRange);
    var spotifyTopArtistsGET = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + spotifyAccessToken
      }
    }
    fetch(artistEndpoint, spotifyTopArtistsGET)
      .then(response => response.json())
      .then((responseJSON) => { 
        responseJSON.items.forEach(artistItem => {
          appendUserTopArtistsState(artistItem, timeRange);  
          })
        });
  };

  const updateUserTopTracks = (spotifyAccessToken, timeRange) => {
    let artistEndpoint = getTrackEndpoint(timeRange);
    var spotifyTopTracksGET = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + spotifyAccessToken
      }
    }
    fetch(artistEndpoint, spotifyTopTracksGET)
      .then(response => response.json())
      .then((responseJSON) => { 
        responseJSON.items.forEach(trackItem => {
          const artistsListString = generateArtistListString(trackItem.artists);
          appendUserTopTracksState(trackItem, artistsListString, timeRange);  
          })
        });
  };

  const updateUserMostRecentTracks = (spotifyAccessToken) => {
    var spotifyMostRecentTracksGET = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + spotifyAccessToken
      }
    }
    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', spotifyMostRecentTracksGET)
      .then(response => response.json())
      .then((responseJSON) => { 
          responseJSON.items.forEach((trackItem, index) => {
            const artistsListString = generateArtistListString(trackItem.track.artists);
            setUserMostRecentTracks(userMostRecentTracks => [...userMostRecentTracks, {"id": trackItem.track.id.concat(index), "name": trackItem.track.name, "artist": artistsListString}]);  
          })
        });
  };

  const generateListUserTopArtists = (userTopArtistsState) => {
    return(
      userTopArtistsState.map((artist) => {
        <li key={artist.id}>
          {artist.name}
        </li> 
      })
    );
  }

  const generateListUserTopTracks = (userTopTracksState) => {
    return(
      userTopTracksState.map((track) => {
        <li key={track.id}>
          {track.name} - {track.artist}
        </li> 
      })
    );
  }

  const listUserMostRecentTracks = userMostRecentTracks.map((track) =>
    <li key={track.id}>
      {track.name} - {track.artist}
    </li>
  );

  return (
    <div className="App">
      <button onClick={loginRedirect}>Login To Spotify</button>
      <div className="Body">
        <label>Top Artists - Short Term (4 Weeks)</label>
        <ul>{generateListUserTopArtists(userTopArtistsShortTerm)}</ul>
        <label>Top Artists - Medium Term (6 Months)</label>
        <ul>{generateListUserTopArtists(userTopArtistsMediumTerm)}</ul>
        <label>Top Artists - Long Term (All Time)</label>
        <ul>{generateListUserTopArtists(userTopArtistsLongTerm)}</ul>
        <label>Top Tracks - Short Term (4 Weeks)</label>
        <ul>{generateListUserTopTracks(userTopTracksShortTerm)}</ul>
        <label>Top Tracks - Medium Term (6 Months)</label>
        <ul>{generateListUserTopTracks(userTopTracksMediumTerm)}</ul>
        <label>Top Artists - Long Term (All Time)</label>
        <ul>{generateListUserTopTracks(userTopTracksLongTerm)}</ul>
        <label>Most Recently Played</label>
        <ul>{listUserMostRecentTracks}</ul>
      </div>
    </div>
  );
}

export default App;
