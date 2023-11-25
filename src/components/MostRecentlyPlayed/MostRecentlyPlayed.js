import { useState, useEffect } from 'react';
import './MostRecentlyPlayed.css';

function MostRecentlyPlayed(props) {
  const [userMostRecentTracks, setUserMostRecentTracks] = useState([]);
  
  useEffect(() => {
    updateUserMostRecentTracks(props.spotifyAccessToken);
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

  const generateArtistListString = (artists) => {
    let artistsList = [];
    artists.forEach((artist) => {
      artistsList.push(artist.name);
    });
    return artistsList.join(", ");  
  };

  const updateUserMostRecentTracks = (accessToken) => {
    var spotifyMostRecentTracksGET = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }
    fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', spotifyMostRecentTracksGET)
      .then(response => response.json())
      .then((responseJSON) => { 
          responseJSON.items.forEach((trackItem, index) => {
            const artistsListString = generateArtistListString(trackItem.track.artists);
            setUserMostRecentTracks(userMostRecentTracks => [...userMostRecentTracks, {"id": trackItem.track.id.concat(index), "name": trackItem.track.name, "artist": artistsListString}]);  
          })
        });
  };

  return (
      <ul>{generateListUserMostRecentTracks()}</ul>
  );

}

export default MostRecentlyPlayed;
