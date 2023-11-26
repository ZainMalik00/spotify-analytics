import { useState, useEffect } from 'react';
import './MostRecentlyPlayed.css';
import SpotifyAPIService from '../../backend/services/spotify-api-service';

function MostRecentlyPlayed() {
  const [userMostRecentTracks, setUserMostRecentTracks] = useState([]);
  
  useEffect(() => {
    setUserMostRecentTracks(SpotifyAPIService.getUserMostRecentTracks());
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

  return (
      <ul>{generateListUserMostRecentTracks()}</ul>
  );

}

export default MostRecentlyPlayed;
