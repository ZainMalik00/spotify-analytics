import { createContext, useState } from "react";

const UserTopTracksContext = createContext();

export function UserTopTracksProvider({children}) {
    const [userTopTracksShortTerm, setUserTopTracksShortTerm] = useState([]);
    const [userTopTracksMediumTerm, setUserTopTracksMediumTerm] = useState([]);
    const [userTopTracksLongTerm, setUserTopTracksLongTerm] = useState([]);

    const updateUserTopTracksShortTerm = (trackList) => {
        setUserTopTracksShortTerm(userTopTracks => userTopTracks.concat(trackList))
    }

    const updateUserTopTracksMediumTerm = (trackList) => {
        setUserTopTracksMediumTerm(userTopTracks => userTopTracks.concat(trackList))
    }

    const updateUserTopTracksLongTerm = (trackList) => {
        setUserTopTracksLongTerm(userTopTracks => userTopTracks.concat(trackList))
    }

    return (
        <UserTopTracksContext.Provider 
            value = {{ 
                userTopTracksShortTerm,
                userTopTracksMediumTerm,
                userTopTracksLongTerm,
                updateUserTopTracksShortTerm, 
                updateUserTopTracksMediumTerm, 
                updateUserTopTracksLongTerm 
            }}
        >
            {children}
        </UserTopTracksContext.Provider>
    );
};

export default UserTopTracksContext;