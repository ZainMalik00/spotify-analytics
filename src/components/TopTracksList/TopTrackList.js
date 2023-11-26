import { useState, useEffect } from 'react';
import './TopTrackList.css';
import SpotifyAPIService from '../../backend/services/spotify-api-service';

function TopTrackList(props) {
    const [userTopTracks, setUserTopTracks] = useState([]);
    
    useEffect(() => {
      setUserTopTracks(SpotifyAPIService.getUserTopTracks(props.timeRange));
    }, []);

    const generateListUserTopTracks = () => {
      return(
        userTopTracks.map((track) => 
          <li key={track.id}>
            {track.name} - {track.artist}
          </li> 
        )
      );
    }

    return (
      <ul>{generateListUserTopTracks()}</ul>
    );

}

export default TopTrackList;
