import './TableTrackList.css';
import { Table } from '@mui/joy';

function TableTrackList (props) {

    if(props.trackList.length !== 0){
        return(
            <Table
                size="lg" 
                variant="soft"
                hoverRow       
                stickyHeader
                color= "primary"
                sx={(theme) => ({
                    '& th': { color: theme.variants.solid.primary }
                })}
            >
                <thead>
                    <tr>
                        <th style={{ width: '1%' }}>#</th>
                        <th style={{ width: '10%' }}>Image</th>
                        <th >Title</th>
                        <th >Artists</th>
                        <th >Album</th>
                        <th style={{ width: '7%' }}>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {props.trackList.map((track, index) => (
                        <tr key={track.id.concat(index)}>
                            <td>{index+1}</td>
                            <td>{<img src= {track.images[2].url}></img>}</td>
                            <td>{track.name}</td>
                            <td>{track.artists}</td>
                            <td>{track.album.name}</td>
                            <td>{track.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }

    return(
        <p>Loading Data...</p>
    );
}
export default TableTrackList;