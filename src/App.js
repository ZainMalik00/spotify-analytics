import './App.css';
import { useState, useEffect } from 'react';
import TopArtistList from './components/TopArtistList/TopArtistList';
import TopTrackList from './components/TopTracksList/TopTrackList';
import MostRecentlyPlayed from './components/MostRecentlyPlayed/MostRecentlyPlayed';


const CLIENT_ID = "1b82855ba97c408590be267aa16378b2";
const SPOTIFY_AUTH = "https://accounts.spotify.com/authorize?";
const REDIRECT_URI = "http://localhost:3000/";
// const REDIRECT_URI = "https://zainmalik00.github.io/spotify-analytics/";
const SPACE_DELIMITER = "%20";
const SCOPES = ["user-top-read", "user-read-recently-played"];
const SCOPES_URL = SCOPES.join(SPACE_DELIMITER);


function App() {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState("");
  const [userMostRecentTracks, setUserMostRecentTracks] = useState([]);

  useEffect(() => {
    document.title = 'Spotify Analytics';
    if(window.location.hash) {
      const spotifyAccessParams = getParamsAfterLoginRedirect(window.location.hash);
      setSpotifyAccessToken(spotifyAccessParams.access_token);
    }
  }, [spotifyAccessToken])

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

  if(spotifyAccessToken.length === 0){
    return (
      <div className="App">
        <button onClick={loginRedirect}>Login To Spotify</button>
      </div>
    );
  }

  return (
    <div className="App">
      <button onClick={loginRedirect}>Re-login To Spotify</button>
      <div className="Body">
        <label>Top Artists - Short Term (4 Weeks)</label>
        <TopArtistList spotifyAccessToken={spotifyAccessToken} timeRange="SHORT" />
        <label>Top Artists - Medium Term (6 Months)</label>
        <TopArtistList spotifyAccessToken={spotifyAccessToken} timeRange="MEDIUM" />
        <label>Top Artists - Long Term (All Time)</label>
        <TopArtistList spotifyAccessToken={spotifyAccessToken} timeRange="LONG" />
        <label>Top Tracks - Short Term (4 Weeks)</label>
        <TopTrackList spotifyAccessToken={spotifyAccessToken} timeRange="SHORT" />
        <label>Top Tracks - Medium Term (6 Months)</label>
        <TopTrackList spotifyAccessToken={spotifyAccessToken} timeRange="MEDIUM" />
        <label>Top Tracks - Long Term (All Time)</label>
        <TopTrackList spotifyAccessToken={spotifyAccessToken} timeRange="LONG" />
        <label>Most Recently Played</label>
        <MostRecentlyPlayed spotifyAccessToken={spotifyAccessToken} />
      </div>
    </div>
  );
}

export default App;
