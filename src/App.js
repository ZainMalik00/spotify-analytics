import './App.css';
import { useState, useEffect } from 'react';
import TopArtistList from './components/TopArtistList/TopArtistList';
import TopTrackList from './components/TopTracksList/TopTrackList';
import MostRecentlyPlayed from './components/MostRecentlyPlayed/MostRecentlyPlayed';
import LoginService from './backend/services/login-service';

function App() {
  const [spotifyAccessToken, setSpotifyAccessToken] = useState("");

  useEffect(() => {
    document.title = 'Spotify Analytics';
    if(window.location.hash) {
      const spotifyAccessParams = LoginService.getParamsAfterLoginRedirect();
      setSpotifyAccessToken(spotifyAccessParams.access_token);
    }
  }, [spotifyAccessToken])

  const loginRedirect = () => {
    LoginService.loginRedirect();
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
        <TopArtistList timeRange="SHORT" />
        <label>Top Artists - Medium Term (6 Months)</label>
        <TopArtistList timeRange="MEDIUM" />
        <label>Top Artists - Long Term (All Time)</label>
        <TopArtistList timeRange="LONG" />
        <label>Top Tracks - Short Term (4 Weeks)</label>
        <TopTrackList timeRange="SHORT" />
        <label>Top Tracks - Medium Term (6 Months)</label>
        <TopTrackList timeRange="MEDIUM" />
        <label>Top Tracks - Long Term (All Time)</label>
        <TopTrackList timeRange="LONG" />
        <label>Most Recently Played</label>
        <MostRecentlyPlayed />
      </div>
    </div>
  );
}

export default App;
