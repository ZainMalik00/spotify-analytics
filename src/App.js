import './App.css';
import { useState, useEffect } from 'react';
import LoginService from './backend/services/login-service';
import { UserTopArtistsProvider } from './backend/data/UserTopArtistsContext';
import { UserTopTracksProvider } from './backend/data/UserTopTracksContext';
import { MostRecentlyPlayedProvider } from './backend/data/MostRecentlyPlayedContext'
import { Box } from '@mui/joy';
import { DevServiceProvider } from './backend/services/dev-service-context';
import LoginPage from './pages/LoginPage/LoginPage';
import UserProfilePage from './pages/UserProfilePage/UserProfilePage';


function App() {

  const [spotifyAccessToken, setSpotifyAccessToken] = useState("");

  useEffect(() => {
    document.title = 'Spotify Analytics';
    if(window.location.hash) {
      const spotifyAccessParams = LoginService.getParamsAfterLoginRedirect();
      setSpotifyAccessToken(spotifyAccessParams.access_token);
    }
  }, [spotifyAccessToken])

  if(spotifyAccessToken.length === 0){
    return (
      <Box 
        className="App"
        sx={(theme) => ({
          backgroundColor: theme.variants.solid.neutral,
        })}
      >
        <DevServiceProvider>
          <LoginPage />
        </DevServiceProvider>
      </Box>
    );
  }

  return (
    <Box
      className="App"
      sx={(theme) => ({
        backgroundColor: theme.variants.solid.neutral,
      })}
    >
      <DevServiceProvider>
        <UserTopArtistsProvider>
          <UserTopTracksProvider>
              <MostRecentlyPlayedProvider>
                <UserProfilePage />
              </MostRecentlyPlayedProvider>
          </UserTopTracksProvider>
        </UserTopArtistsProvider>
      </DevServiceProvider>
    </Box>
  );
}

export default App;
