import { useEffect, useContext, useState } from 'react';
import './UserTopItemsContainer.css';
import TopArtistList from './TopArtistList/TopArtistList';
import SpotifyAPIService from '../../backend/services/spotify-api-service';
import UserTopArtistsContext from '../../backend/data/UserTopArtistsContext';
import UserTopTracksContext from '../../backend/data/UserTopTracksContext';
import MostRecentlyPlayedList from '../MostRecentlyPlayedList/MostRecentlyPlayedList';
import MostRecentlyPlayedContext from '../../backend/data/MostRecentlyPlayedContext';
import { Option, Select } from '@mui/joy';
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
                <label id='ArtistsLabel'>Top Artists</label>
                <Select defaultValue="SHORT" onChange={handleSelectArtistsOnChange}>
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
                <label id='TracksLabel'>Top Tracks</label>
                <Select defaultValue="SHORT" onChange={handleSelectTracksOnChange}>
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
                <label id="MostRecentlyPlayedLabel">Most Recently Played</label>
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