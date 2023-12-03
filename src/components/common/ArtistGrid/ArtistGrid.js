import { Grid } from '@mui/joy';

import './ArtistGrid.css';
import ArtistCard from './ArtistCard/ArtistCard';

function ArtistGrid (props) {

    if(props.artistList.length !== 0){
        return(
            <Grid   
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                sx={{ flexGrow: 1 }}
            >
                {props.artistList.map((artist, index) => {
                    return(
                        <Grid key={index}>
                            <ArtistCard index={index+1} artistItem={artist} />
                        </Grid>
                    );
                })}
            </Grid>
        );
    }

    return(
        <p>Loading Data...</p>
    );

}

export default ArtistGrid;