import styles from './LoginPage.module.css';
import { useEffect, useContext } from 'react';
import LoginService from '../../backend/services/login-service';
import { Box, Button } from '@mui/joy';
import DevServiceContext from '../../backend/services/dev-service-context';

function LoginPage () {
    const {updateIsDevMode, isDevMode} = useContext(DevServiceContext);

    useEffect(() => {
        updateIsDevMode();
      }, [])

    const loginRedirect = () => {
        if(isDevMode === "true"){
            LoginService.loginRedirectDev();
        } else {
            LoginService.loginRedirectProd();
        }
    }

    return(
        <Box 
            className={styles.Content}
            sx={(theme) => ({
                backgroundColor: theme.variants.solid.neutral,
                height: '100svh',
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

export default LoginPage;