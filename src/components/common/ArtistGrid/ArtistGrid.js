import { Box, Grid, Stack } from '@mui/joy';

import './ArtistGrid.css';
import ArtistCard from './ArtistCard/ArtistCard';

function ArtistGrid (props) {

    if(props.artistList.length !== 0){
        return(
            <Grid   
                container
                columns={{ xs: 4, sm: 8, md: 12 }}
                align= "center"
                justify = "center"
            >
                {props.artistList.map((artist, index) => {
                    return(
                        <Grid 
                            key={index}
                            sx={{ 
                                m: 2,
                                flexGrow: 1 
                            }}
                        >
                            <ArtistCard index={index+1} artistItem={artist} />
                        </Grid>
                    );
                })}

                {props.artistList.map((_, index) => { //Fill Last Row With Dummy Elements
                    return(
                        <Grid 
                            key={index+props.artistList.length}
<<<<<<< HEAD
                            sx={{ 
                                mx: 2,
                                flexGrow: 1 
                            }}
=======
                            sx={{ flexGrow: 1 }}
>>>>>>> 28124840317f1024ed7cdf2287389186da90148d
                        >
                            <div style={{width: 160, height: 0}}></div>
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