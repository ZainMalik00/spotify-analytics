import { useEffect, useContext, useState } from 'react';
import './UserTopItemsContainer.css';
import TopArtistList from './TopArtistList/TopArtistList';
import TopTrackList from './TopTracksList/TopTrackList';
import SpotifyAPIService from '../../backend/services/spotify-api-service';
import UserTopArtistsContext from '../../backend/data/UserTopArtistsContext';
import UserTopTracksContext from '../../backend/data/UserTopTracksContext';
import MostRecentlyPlayedList from '../MostRecentlyPlayedList/MostRecentlyPlayedList';
import MostRecentlyPlayedContext from '../../backend/data/MostRecentlyPlayedContext';
import { Option, Select } from '@mui/joy';
import TableTrackList from '../common/TableTrackList/TableTrackList';

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

    useEffect(() => {
        ( async () => {
            updateUserTopArtistsShortTerm(await SpotifyAPIService.getUserTopArtists("SHORT"));
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

    return (
        <div className='UserTopItemsContainer'>
            <label>Top Artists - Short Term (4 Weeks)</label>
            <TopArtistList userTopArtists={userTopArtistsShortTerm} />
            <label>Top Artists - Medium Term (6 Months)</label>
            <TopArtistList userTopArtists={userTopArtistsMediumTerm} />
            <label>Top Artists - Long Term (All Time)</label>
            <TopArtistList userTopArtists={userTopArtistsLongTerm} />
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