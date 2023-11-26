import { useState, useEffect } from 'react';
import './MostRecentlyPlayed.css';
import SpotifyAPIService from '../../backend/services/spotify-api-service';

function MostRecentlyPlayed() {
  const [userMostRecentTracks, setUserMostRecentTracks] = useState([]);
  
  useEffect(() => {
    const mostRecentlyPlayed = SpotifyAPIService.getUserMostRecentTracks();
    setTimeout(() => {setUserMostRecentTracks(userMostRecentTracks => userMostRecentTracks.concat(mostRecentlyPlayed))}
      , 1000);
  }, []);

  const generateListUserMostRecentTracks = () => {
    return (
      userMostRecentTracks.map((track) =>
        <li key={track.id}>
          {track.name} - {track.artist}
        </li>
      )
    );
  }

  if(userMostRecentTracks.length !== 0){
    return (
      <ul>{generateListUserMostRecentTracks()}</ul>
    );
  }

  return (
    <p>Loading...</p>
  );

}

export default MostRecentlyPlayed;
