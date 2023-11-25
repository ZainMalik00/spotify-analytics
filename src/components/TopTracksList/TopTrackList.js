import { useState, useEffect } from 'react';
import './TopTrackList.css';

function TopTrackList(props) {
    const [userTopTracks, setUserTopTracks] = useState([]);
    
    useEffect(() => {
        updateUserTopTracks(props.spotifyAccessToken, props.timeRange);
    }, []);

    const getTrackEndpoint = (timeRange) => {
        switch (timeRange){
          case 'SHORT': return 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50&offset=0';
          case 'MEDIUM': return  'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=0';
          case 'LONG': return 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50&offset=0';
          default: return  'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=50&offset=0';
        };
    };

    const generateListUserTopTracks = () => {
      return(
        userTopTracks.map((track) => 
          <li key={track.id}>
            {track.name} - {track.artist}
          </li> 
        )
      );
    }

    const generateArtistListString = (artists) => {
      let artistsList = [];
      artists.forEach((artist) => {
        artistsList.push(artist.name);
      });
      return artistsList.join(", ");  
    };

    const updateUserTopTracks = (accessToken, timeRange) => {
        let trackEndpoint = getTrackEndpoint(timeRange);
        var spotifyTopTracksGET = {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + accessToken
          }
        }
        fetch(trackEndpoint, spotifyTopTracksGET)
          .then(response => response.json())
          .then((responseJSON) => { 
            responseJSON.items.forEach(trackItem => {
              const artistsListString = generateArtistListString(trackItem.artists);
              setUserTopTracks(userTopTracks => [...userTopTracks, {"id": trackItem.id, "name": trackItem.name, "artist": artistsListString}]);  
              })
            });
    };

    return (
        <ul>{generateListUserTopTracks()}</ul>
    );

}

export default TopTrackList;
