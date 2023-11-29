import './TopTrackList.css';


function TopTrackList(props) {

    const generateListUserTopTracks = () => {
      return(
        props.userTopTracks.map((track) => 
          <li key={track.id}>
            {track.name} - {track.artists}
          </li> 
        )
      );
    }

    if(props.userTopTracks.length !== 0){
      return (
        <ul>{generateListUserTopTracks()}</ul>
      );
    }

    return (
      <p>Loading Data...</p>
    );

}

export default TopTrackList;
