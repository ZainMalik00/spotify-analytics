import { useState, useEffect } from 'react';
import './TopTrackList.css';
import SpotifyAPIService from '../../backend/services/spotify-api-service';

function TopTrackList(props) {
    const [userTopTracks, setUserTopTracks] = useState([]);
    
    useEffect(() => {
      const topTracks = SpotifyAPIService.getUserTopTracks(props.timeRange);
      setTimeout(() => {setUserTopTracks(userTopTracks => userTopTracks.concat(topTracks))}
        , 500);
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

    if(userTopTracks.length !== 0){
      return (
        <ul>{generateListUserTopTracks()}</ul>
      );
    }

    return (
      <p>Loading...</p>
    );

}

export default TopTrackList;
