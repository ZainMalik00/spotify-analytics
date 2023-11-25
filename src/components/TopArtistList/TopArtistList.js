import { useState, useEffect } from 'react';
import './TopArtistList.css';

function TopArtistList(props) {
    const [userTopArtists, setUserTopArtists] = useState([]);
    
    useEffect(() => {
        updateUserTopArtists(props.spotifyAccessToken, props.timeRange);
    }, []);

    const getArtistEndpoint = (timeRange) => {
        switch (timeRange){
          case 'SHORT': return 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=50&offset=0';
          case 'MEDIUM': return  'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50&offset=0';
          case 'LONG': return 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50&offset=0';
          default: return  'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=50&offset=0';
        };
    };

    const generateListUserTopArtists = () => {
        return(
            userTopArtists.map((artist) =>
                <li key={artist.id}>
                    {artist.name}
                </li> 
            )
        );
      }

    const updateUserTopArtists = (accessToken, timeRange) => {
        let artistEndpoint = getArtistEndpoint(timeRange);
        var spotifyTopArtistsGET = {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        }
        fetch(artistEndpoint, spotifyTopArtistsGET)
          .then(response => response.json())
          .then((responseJSON) => { 
            responseJSON.items.forEach(artistItem => {
                setUserTopArtists(userTopArtists => [...userTopArtists, {"id": artistItem.id, "name": artistItem.name}]);  
              })
            });
    };

    return (
        <ul>{generateListUserTopArtists()}</ul>
    );

}

export default TopArtistList;
