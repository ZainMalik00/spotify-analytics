import { useEffect, useContext, useState } from 'react';
import './UserTopItemsContainer.css';
import SpotifyAPIService from '../../backend/services/spotify-api-service';
import UserTopArtistsContext from '../../backend/data/UserTopArtistsContext';
import UserTopTracksContext from '../../backend/data/UserTopTracksContext';
import MostRecentlyPlayedList from '../MostRecentlyPlayedList/MostRecentlyPlayedList';
import MostRecentlyPlayedContext from '../../backend/data/MostRecentlyPlayedContext';
import { Option, Select, Typography } from '@mui/joy';
import TableTrackList from '../common/TableTrackList/TableTrackList';
import ArtistGrid from '../common/ArtistGrid/ArtistGrid';

function UserTopItemsContainer() {

    const { 
        userTopArtistsShortTerm,
        userTopArtistsMediumTerm,
        userTopArtistsLongTerm, 
        updateUserTopArtistsShortTerm,
        updateUserTopArtistsMediumTerm,
        updateUserTopArtistsLongTerm
    } = useContext(UserTopArtistsContext);

    const { 
        userTopTracksShortTerm,
        userTopTracksMediumTerm,
        userTopTracksLongTerm, 
        updateUserTopTracksShortTerm,
        updateUserTopTracksMediumTerm,
        updateUserTopTracksLongTerm
    } = useContext(UserTopTracksContext);

    const { updateMostRecentlyPlayed } = useContext (MostRecentlyPlayedContext);
    
    const [currentUserTopTracks, setCurrentUserTopTracks] = useState([]);
    const [currentUserTopArtists, setCurrentUserTopArtists] = useState([]);

    useEffect(() => {
        ( async () => {
            const artistsShortTerm = await SpotifyAPIService.getUserTopArtists("SHORT");
            setCurrentUserTopArtists(artistsShortTerm);
            updateUserTopArtistsShortTerm(artistsShortTerm);
            updateUserTopArtistsMediumTerm(await SpotifyAPIService.getUserTopArtists("MEDIUM"));
            updateUserTopArtistsLongTerm(await SpotifyAPIService.getUserTopArtists("LONG"));

            const tracksShortTerm = await SpotifyAPIService.getUserTopTracks("SHORT");
            setCurrentUserTopTracks(tracksShortTerm);
            updateUserTopTracksShortTerm(tracksShortTerm);
            updateUserTopTracksMediumTerm(await SpotifyAPIService.getUserTopTracks("MEDIUM"));
            updateUserTopTracksLongTerm(await SpotifyAPIService.getUserTopTracks("LONG"));

            updateMostRecentlyPlayed(await SpotifyAPIService.getUserMostRecentPlayed());
        })()

    }, []);


    const handleSelectTracksOnChange = (event, newValue) => {
        switch(newValue){
            case "SHORT":
                setCurrentUserTopTracks(userTopTracksShortTerm);
                break;
            case "MEDIUM":
                setCurrentUserTopTracks(userTopTracksMediumTerm);
                break;
            case "LONG":
                setCurrentUserTopTracks(userTopTracksLongTerm);
                break;
            default: 
                setCurrentUserTopTracks(userTopTracksShortTerm);;  
        }
    };

    const handleSelectArtistsOnChange = (event, newValue) => {
        switch(newValue){
            case "SHORT":
                setCurrentUserTopArtists(userTopArtistsShortTerm);
                break;
            case "MEDIUM":
                setCurrentUserTopArtists(userTopArtistsMediumTerm);
                break;
            case "LONG":
                setCurrentUserTopArtists(userTopArtistsLongTerm);
                break;
            default: 
                setCurrentUserTopArtists(userTopArtistsShortTerm);;  
        }
    };

    return (
        <div className='UserTopItemsContainer'>
            <div id='ArtistHeader'>
                <Typography level="h3" sx={{ fontWeight: 'bold' }} color="white">Top Artists</Typography>
                <Select defaultValue="SHORT" color="primary" variant="soft" onChange={handleSelectArtistsOnChange}>
                    <Option value="SHORT">4 Weeks</Option>
                    <Option value="MEDIUM">6 Months</Option>
                    <Option value="LONG">All Time</Option>
                </Select>
            </div>
            <div className="ArtistListContainer">
                <div className="ArtistList">
                    <ArtistGrid artistList={currentUserTopArtists} />
                </div>
            </div>
            <div id='TracksHeader'>
            <Typography level="h3" sx={{ fontWeight: 'bold' }} color="white">Top Tracks</Typography>
                <Select defaultValue="SHORT" color="primary" variant="soft" onChange={handleSelectTracksOnChange}>
                    <Option value="SHORT">4 Weeks</Option>
                    <Option value="MEDIUM">6 Months</Option>
                    <Option value="LONG">All Time</Option>
                </Select>
            </div>
            <div className="TrackListContainer">
                <div className="TrackList">
                    <TableTrackList trackList={currentUserTopTracks}/>
                </div>
            </div>
            <div id="MostRecentlyPlayedHeader">
                <Typography level="h3" sx={{ fontWeight: 'bold' }} color="white">Most Recently Played</Typography>
            </div>
            <div className="TrackListContainer">
                <div className="TrackList">
                    <MostRecentlyPlayedList />
                </div>
            </div>
            
        </div>
    );
}

export default UserTopItemsContainer;