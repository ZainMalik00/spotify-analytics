import { useContext, useEffect } from 'react';
import './MostRecentlyPlayedList.css';
import MostRecentlyPlayedContext from '../../backend/data/MostRecentlyPlayedContext';


function MostRecentlyPlayedList() {
  const {userMostRecentlyPlayed} = useContext(MostRecentlyPlayedContext);

  const generateListUserMostRecentTracks = () => {
    return (
      userMostRecentlyPlayed.map((track, index) =>
        <li key={track.id.concat(index)}>
          {track.name} - {track.artist}
        </li>
      )
    );
  }

  if(userMostRecentlyPlayed.length !== 0){
    return (
      <ul>{generateListUserMostRecentTracks()}</ul>
    );
  }

  return (
    <p>Loading Data...</p>
  );

}

export default MostRecentlyPlayedList;
