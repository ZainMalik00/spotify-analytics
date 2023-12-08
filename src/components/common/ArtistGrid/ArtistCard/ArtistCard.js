import { useState } from "react";
import "./ArtistCard.css"
import { Box, Card, CardContent, CardCover, Typography } from '@mui/joy';

function ArtistCard(props){

    const [isHidden, setIsHidden] = useState(true);

    if(!!props.artistItem){
        return(
            <Card
                variant="solid"
                sx={{ 
                    width: 160, 
                    height: 160, 
                    paddingLeft: "0px", 
                    paddingRight: "0px", 
                    paddingBottom: "0px"
                }}
            >
                <CardCover>
                    <img 
                        src={props.artistItem.images[0].url}
                        loading="lazy"
                        alt={props.artistItem.name}
                        width={props.artistItem.images[0].width}
                        height={props.artistItem.images[0].height}
                    />
                </CardCover>
                <CardContent sx={{ justifyContent: 'flex-end'}}>
                    <Box
                        sx={(theme) => ({
                            backgroundColor: theme.variants.soft.neutral, 
                            opacity:"75%", 
                            paddingLeft: "5px", 
                            paddingRight: "5px", 
                            paddingBottom: "10px",
                            borderBottomLeftRadius: 8,
                            borderBottomRightRadius: 8,
                        })}
                        onMouseEnter={() => setIsHidden(false)}
                        onMouseLeave={() => setIsHidden(true)}
                    >
                        <Typography level="title-md" color="primary" sx={{textTransform: 'uppercase'}}>{props.index}{". "}{props.artistItem.name}</Typography>
                        <Typography level="body-sm" color="primary" variant="soft" sx={{textTransform: 'uppercase'}}>{isHidden? "" : props.artistItem.genres.join(", ")}</Typography>
                    </Box>   
                </CardContent>  
            </Card>
        );
    }

    return(
        <p>Loading Data...</p>
    );

}

export default ArtistCard;