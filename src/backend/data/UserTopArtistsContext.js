import { createContext, useState } from "react";

const UserTopArtistsContext = createContext();

export function UserTopArtistsProvider({children}) {
    const [userTopArtistsShortTerm, setUserTopArtistsShortTerm] = useState([]);
    const [userTopArtistsMediumTerm, setUserTopArtistsMediumTerm] = useState([]);
    const [userTopArtistsLongTerm, setUserTopArtistsLongTerm] = useState([]);

    const updateUserTopArtistsShortTerm = (artistList) => {
        setUserTopArtistsShortTerm(userTopArtists => userTopArtists.concat(artistList))
    }

    const updateUserTopArtistsMediumTerm = (artistList) => {
        setUserTopArtistsMediumTerm(userTopArtists => userTopArtists.concat(artistList))
    }

    const updateUserTopArtistsLongTerm = (artistList) => {
        setUserTopArtistsLongTerm(userTopArtists => userTopArtists.concat(artistList))
    }

    return (
        <UserTopArtistsContext.Provider 
            value = {{ 
                userTopArtistsShortTerm,
                userTopArtistsMediumTerm,
                userTopArtistsLongTerm,
                updateUserTopArtistsShortTerm, 
                updateUserTopArtistsMediumTerm, 
                updateUserTopArtistsLongTerm 
            }}
        >
            {children}
        </UserTopArtistsContext.Provider>
    );
};

export default UserTopArtistsContext;