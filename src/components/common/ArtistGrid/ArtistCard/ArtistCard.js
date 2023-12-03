import "./ArtistCard.css"
import { AspectRatio, Card, CardContent, CardCover, CardOverflow, Typography } from '@mui/joy';

function ArtistCard(props){
    if(!!props.artistItem){
        return(
            <Card sx={{ width: 160, height: 160, paddingLeft: "0px", paddingRight: "0px", paddingBottom: "0px"}}>
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
                    <div style={{backgroundColor: "white", opacity:"75%", paddingLeft: "5px", paddingRight: "5px", paddingBottom: "10px"}}>
                        <Typography level="title-md" sx={{textTransform: 'uppercase'}}>{props.index}{". "}{props.artistItem.name}</Typography>
                        <Typography level="body-sm" sx={{textTransform: 'uppercase'}}>{props.artistItem.genres.join(", ")}</Typography>
                    </div>   
                </CardContent>  
            </Card>
        );
    }

    return(
        <p>Loading Data...</p>
    );

}

export default ArtistCard;