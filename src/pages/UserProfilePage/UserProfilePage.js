import styles from './UserProfilePage.module.css';
import { useEffect, useContext } from 'react';
import { Box } from '@mui/joy';
import UserTopItemsContainer from '../../components/UserTopItems/UserTopItemsContainer';
import DevServiceContext from '../../backend/services/dev-service-context';


function UserProfilePage () {
    const {updateIsDevMode} = useContext(DevServiceContext);

    useEffect(() => {
        updateIsDevMode();
      }, [])

    return(
        <Box className={styles.Content}>
            <UserTopItemsContainer />
        </Box>
    );
}

export default UserProfilePage;