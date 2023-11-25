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
    if(window.location.hash) {
      const spotifyAccessParams = getParamsAfterLoginRedirect(window.location.hash);
      if(spotifyAccessParams.access_token.length != 0){
        updateUserTopArtistsShortTerm(spotifyAccessParams.access_token);
        updateUserTopArtistsMediumTerm(spotifyAccessParams.access_token);
        updateUserTopArtistsLongTerm(spotifyAccessParams.access_token);
        updateUserTopTracksShortTerm(spotifyAccessParams.access_token);
        updateUserTopTracksMediumTerm(spotifyAccessParams.access_token);
        updateUserTopTracksLongTerm(spotifyAccessParams.access_token);
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

  const updateUserTopArtistsShortTerm = (spotifyAccessToken) => {
    var spotifyTopArtistsShortTermGET = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + spotifyAccessToken
      }
    }
    fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50&offset=0', spotifyTopArtistsShortTermGET)
      .then(response => response.json())
      .then((responseJSON) => { 
          responseJSON.items.forEach(artistItem => {
          setUserTopArtistsShortTerm(userTopArtistsShortTerm => [...userTopArtistsShortTerm, {"id": artistItem.id, "name": artistItem.name}]);  
          })
        });
  };

  const updateUserTopArtistsMediumTerm = (spotifyAccessToken) => {
    var spotifyTopArtistsMediumTermGET = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + spotifyAccessToken
      }
    }
    fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50&offset=0', spotifyTopArtistsMediumTermGET)
      .then(response => response.json())
      .then((responseJSON) => { 
          responseJSON.items.forEach(artistItem => {
          setUserTopArtistsMediumTerm(userTopArtistsMediumTerm => [...userTopArtistsMediumTerm, {"id": artistItem.id, "name": artistItem.name}]);  
          })
        });
  };

  const updateUserTopArtistsLongTerm = (spotifyAccessToken) => {
    var spotifyTopArtistsLongTermGET = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + spotifyAccessToken
      }
    }
    fetch('https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0', spotifyTopArtistsLongTermGET)
      .then(response => response.json())
      .then((responseJSON) => { 
          responseJSON.items.forEach(artistItem => {
          setUserTopArtistsLongTerm(userTopArtistsLongTerm => [...userTopArtistsLongTerm, {"id": artistItem.id, "name": artistItem.name}]);  
          })
        });
  };

  const updateUserTopTracksShortTerm = (spotifyAccessToken) => {
    var spotifyTopTracksShortTermGET = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + spotifyAccessToken
      }
    }
    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50&offset=0', spotifyTopTracksShortTermGET)
      .then(response => response.json())
      .then((responseJSON) => { 
          responseJSON.items.forEach(trackItem => {
            let artistsList = [];
            trackItem.artists.forEach((artist) => {
              artistsList.push(artist.name);
            });
            const artistsListString = artistsList.join(", ");
            setUserTopTracksShortTerm(userTopTracksShortTerm => [...userTopTracksShortTerm, {"id": trackItem.id, "name": trackItem.name, "artist": artistsListString}]);  
          })
        });
  };

  const updateUserTopTracksMediumTerm = (spotifyAccessToken) => {
    var spotifyTopTracksMediumTermGET = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + spotifyAccessToken
      }
    }
    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=0', spotifyTopTracksMediumTermGET)
      .then(response => response.json())
      .then((responseJSON) => { 
          responseJSON.items.forEach(trackItem => {
            let artistsList = [];
            trackItem.artists.forEach((artist) => {
              artistsList.push(artist.name);
            });
            const artistsListString = artistsList.join(", ");
            setUserTopTracksMediumTerm(userTopTracksMediumTerm => [...userTopTracksMediumTerm, {"id": trackItem.id, "name": trackItem.name, "artist": artistsListString}]);  
          })
        });
  };

  const updateUserTopTracksLongTerm = (spotifyAccessToken) => {
    var spotifyTopTracksLongTermGET = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + spotifyAccessToken
      }
    }
    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0', spotifyTopTracksLongTermGET)
      .then(response => response.json())
      .then((responseJSON) => { 
          responseJSON.items.forEach(trackItem => {
            let artistsList = [];
            trackItem.artists.forEach((artist) => {
              artistsList.push(artist.name);
            });
            const artistsListString = artistsList.join(", ");
            setUserTopTracksLongTerm(userTopTracksLongTerm => [...userTopTracksLongTerm, {"id": trackItem.id, "name": trackItem.name, "artist": artistsListString}]);  
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
            let artistsList = [];
            trackItem.track.artists.forEach((artist) => {
              artistsList.push(artist.name);
            });
            const artistsListString = artistsList.join(", ");
            setUserMostRecentTracks(userMostRecentTracks => [...userMostRecentTracks, {"id": trackItem.track.id.concat(index), "name": trackItem.track.name, "artist": artistsListString}]);  
          })
        });
  };

  const listUserTopArtistsShortTermItems = userTopArtistsShortTerm.map((artist) =>
    <li key={artist.id}>
      {artist.name}
    </li>
  );

  const listUserTopArtistsMediumTermItems = userTopArtistsMediumTerm.map((artist) =>
    <li key={artist.id}>
      {artist.name}
    </li>
  );

  const listUserTopArtistsLongTermItems = userTopArtistsLongTerm.map((artist) =>
    <li key={artist.id}>
      {artist.name}
    </li>
  );

  const listUserTopTracksShortTermItems = userTopTracksShortTerm.map((track) =>
    <li key={track.id}>
      {track.name} - {track.artist}
    </li>
  );

  const listUserTopTracksMediumTermItems = userTopTracksMediumTerm.map((track) =>
    <li key={track.id}>
      {track.name} - {track.artist}
    </li>
  );

  const listUserTopTracksLongTermItems = userTopTracksLongTerm.map((track) =>
    <li key={track.id}>
      {track.name} - {track.artist}
    </li>
  );

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
        <ul>{listUserTopArtistsShortTermItems}</ul>
        <label>Top Artists - Medium Term (6 Months)</label>
        <ul>{listUserTopArtistsMediumTermItems}</ul>
        <label>Top Artists - Long Term (All Time)</label>
        <ul>{listUserTopArtistsLongTermItems}</ul>
        <label>Top Tracks - Short Term (4 Weeks)</label>
        <ul>{listUserTopTracksShortTermItems}</ul>
        <label>Top Tracks - Medium Term (6 Months)</label>
        <ul>{listUserTopTracksMediumTermItems}</ul>
        <label>Top Artists - Long Term (All Time)</label>
        <ul>{listUserTopTracksLongTermItems}</ul>
        <label>Most Recently Played</label>
        <ul>{listUserMostRecentTracks}</ul>
      </div>
    </div>
  );
}

export default App;
