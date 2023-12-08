import './App.css';
import { useState, useEffect } from 'react';
import LoginService from './backend/services/login-service';
import { UserTopArtistsProvider } from './backend/data/UserTopArtistsContext';
import { UserTopTracksProvider } from './backend/data/UserTopTracksContext';
import { MostRecentlyPlayedProvider } from './backend/data/MostRecentlyPlayedContext'
import UserTopItemsContainer from './components/UserTopItems/UserTopItemsContainer';
import { Box, Button } from '@mui/joy';

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
      <Box
        container 
        className="App"
        sx={(theme) => ({
          backgroundColor: theme.variants.solid.neutral,
          height: '100lvh',
          justifyContent: "center",
          alignItems: "center"
        })}
      >
        <Box>
          <Button size="lg" onClick={loginRedirect}>Login To Spotify</Button>
        </Box>   
      </Box>
    );
  }

  return (
    <Box
      container 
      className="App"
      sx={(theme) => ({
        backgroundColor: theme.variants.solid.neutral,
      })}
    >
      <Box className='Content'>
        <Button onClick={loginRedirect}>Re-login To Spotify</Button>
        <UserTopArtistsProvider>
          <UserTopTracksProvider>
            <MostRecentlyPlayedProvider>
              <UserTopItemsContainer />
            </MostRecentlyPlayedProvider>
          </UserTopTracksProvider>
        </UserTopArtistsProvider>
      </Box>
    </Box>
  );
}

export default App;
