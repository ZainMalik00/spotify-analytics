import styles from './UserProfilePage.module.css';
import { useEffect, useContext } from 'react';
import LoginService from '../../backend/services/login-service';
import { Box, Button } from '@mui/joy';
import UserTopItemsContainer from '../../components/UserTopItems/UserTopItemsContainer';
import DevServiceContext from '../../backend/services/dev-service-context';

function UserProfilePage () {
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
        <Box className={styles.Content}>
            <Button onClick={loginRedirect}>Re-login To Spotify</Button>
            <UserTopItemsContainer />
        </Box>
    );
}

export default UserProfilePage;