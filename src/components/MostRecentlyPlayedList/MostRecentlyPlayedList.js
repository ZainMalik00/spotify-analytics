import { useContext } from 'react';
import './MostRecentlyPlayedList.css';
import MostRecentlyPlayedContext from '../../backend/data/MostRecentlyPlayedContext';
import TableTrackList from '../common/TableTrackList/TableTrackList';

function MostRecentlyPlayedList() {
  const {userMostRecentlyPlayed} = useContext(MostRecentlyPlayedContext);

  if(userMostRecentlyPlayed.length !== 0){
    return (
      <div>
        <TableTrackList trackList= {userMostRecentlyPlayed} />        
      </div>
    );
  }

  return (
    <p>Loading Data...</p>
  );

}

export default MostRecentlyPlayedList;
