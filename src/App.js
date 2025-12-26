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
    
    // Check for stored token first
    const storedToken = LoginService.getStoredToken();
    if (storedToken) {
      setSpotifyAccessToken(storedToken);
      return;
    }

    // Check for authorization code in query parameters (authorization code flow)
    const queryParams = LoginService.getQueryParams();
    if (queryParams.code) {
      LoginService.exchangeCodeForToken(queryParams.code)
        .then(tokenData => {
          LoginService.storeToken(tokenData);
          setSpotifyAccessToken(tokenData.access_token);
          // Clean up URL by removing query parameters
          window.history.replaceState({}, document.title, window.location.pathname);
        })
        .catch(error => {
          console.error('Failed to exchange code for token:', error);
          // Clear any error parameters from URL
          window.history.replaceState({}, document.title, window.location.pathname);
        });
      return;
    }

    // Fallback: Check for access token in hash (implicit grant flow - for prod)
    if(window.location.hash) {
      const spotifyAccessParams = LoginService.getParamsAfterLoginRedirect();
      if (spotifyAccessParams.access_token) {
        setSpotifyAccessToken(spotifyAccessParams.access_token);
      }
    }
  }, [])

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
