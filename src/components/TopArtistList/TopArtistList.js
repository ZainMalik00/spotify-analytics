import { useState, useEffect } from 'react';
import './TopArtistList.css';
import SpotifyAPIService from '../../backend/services/spotify-api-service';

function TopArtistList(props) {
    const [userTopArtists, setUserTopArtists] = useState([]);
    
    useEffect(() => {
      setUserTopArtists(SpotifyAPIService.getUserTopArtists(props.timeRange));
    }, []);

    const generateListUserTopArtists = () => {
      return(
          userTopArtists.map((artist) =>
              <li key={artist.id}>
                  {artist.name}
              </li> 
          )
      );
    }

    if(userTopArtists.length !== 0){
      return (
        <ul>{generateListUserTopArtists()}</ul>
      );
    }

    return (
      <p>Loading...</p>
    );

}

export default TopArtistList;
