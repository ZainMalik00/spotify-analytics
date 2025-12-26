import { useContext } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LoginService from '../../backend/services/login-service';
import DevServiceContext from '../../backend/services/dev-service-context';
import './NavBar.css';

function NavBar() {
    const { isDevMode } = useContext(DevServiceContext);

    const handleSmoothScroll = (e, elementId) => {
        e.preventDefault();
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const loginRedirect = () => {

        const isConfirmed = window.confirm("Are you sure you want to re-login to Spotify?");

        if (isConfirmed) {
            if(isDevMode === "true"){
                LoginService.loginRedirectDev();
            } else {
                LoginService.loginRedirectProd();
            }
        }
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box sx={{ display: 'flex', gap: 2, flexGrow: 1 }}>
                    <Button 
                        color="inherit" 
                        href="#ArtistHeader"
                        onClick={(e) => handleSmoothScroll(e, 'ArtistHeader')}
                        sx={{ textTransform: 'none', fontSize: '1rem' }}
                    >
                        Artists
                    </Button>
                    <Button 
                        color="inherit" 
                        href="#TracksHeader"
                        onClick={(e) => handleSmoothScroll(e, 'TracksHeader')}
                        sx={{ textTransform: 'none', fontSize: '1rem' }}
                    >
                        Tracks
                    </Button>
                    <Button 
                        color="inherit" 
                        href="#MostRecentlyPlayedHeader"
                        onClick={(e) => handleSmoothScroll(e, 'MostRecentlyPlayedHeader')}
                        sx={{ textTransform: 'none', fontSize: '1rem' }}
                    >
                        Recently Played
                    </Button>
                </Box>
                <Button
                    color="inherit"
                    onClick={loginRedirect}
                    sx={{ minWidth: 'auto', padding: '8px' }}
                    aria-label="Re-login to Spotify"
                >
                    <LoginIcon />
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;

