import { useEffect, useContext } from 'react';
import './UserTopItemsContainer.css';
import TopArtistList from './TopArtistList/TopArtistList';
import TopTrackList from './TopTracksList/TopTrackList';
import SpotifyAPIService from '../../backend/services/spotify-api-service';
import UserTopArtistsContext from '../../backend/data/UserTopArtistsContext';
import UserTopTracksContext from '../../backend/data/UserTopTracksContext';
import MostRecentlyPlayedList from '../MostRecentlyPlayedList/MostRecentlyPlayedList';
import MostRecentlyPlayedContext from '../../backend/data/MostRecentlyPlayedContext';

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

    useEffect(() => {
        ( async () => {
            updateUserTopArtistsShortTerm(await SpotifyAPIService.getUserTopArtists("SHORT"));
            updateUserTopArtistsMediumTerm(await SpotifyAPIService.getUserTopArtists("MEDIUM"));
            updateUserTopArtistsLongTerm(await SpotifyAPIService.getUserTopArtists("LONG"));

            updateUserTopTracksShortTerm(await SpotifyAPIService.getUserTopTracks("SHORT"));
            updateUserTopTracksMediumTerm(await SpotifyAPIService.getUserTopTracks("MEDIUM"));
            updateUserTopTracksLongTerm(await SpotifyAPIService.getUserTopTracks("LONG"));

            updateMostRecentlyPlayed(await SpotifyAPIService.getUserMostRecentPlayed());
        })()

    }, []);

    return (
        <div>
            <label>Top Artists - Short Term (4 Weeks)</label>
            <TopArtistList userTopArtists={userTopArtistsShortTerm} />
            <label>Top Artists - Medium Term (6 Months)</label>
            <TopArtistList userTopArtists={userTopArtistsMediumTerm} />
            <label>Top Artists - Long Term (All Time)</label>
            <TopArtistList userTopArtists={userTopArtistsLongTerm} />
            <label>Top Tracks - Short Term (4 Weeks)</label>
            <TopTrackList userTopTracks={userTopTracksShortTerm} />
            <label>Top Tracks - Medium Term (6 Months)</label>
            <TopTrackList userTopTracks={userTopTracksMediumTerm} />
            <label>Top Tracks - Long Term (All Time)</label>
            <TopTrackList userTopTracks={userTopTracksLongTerm} />
            <label>Most Recently Played</label>
            <MostRecentlyPlayedList />
        </div>
    );
}

export default UserTopItemsContainer;