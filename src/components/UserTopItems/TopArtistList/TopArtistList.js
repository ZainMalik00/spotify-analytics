import './TopArtistList.css';

function TopArtistList(props) {

    const generateListUserTopArtists = () => {
      return(
        props.userTopArtists.map((artist) =>
            <li key={artist.id}>
                {artist.name}
            </li> 
        )
      );
    }

    if(props.userTopArtists.length !== 0){
      return (
        <ul>{generateListUserTopArtists()}</ul>
      );
    }

    return (
      <p>Loading Data...</p>
    );

}

export default TopArtistList;
