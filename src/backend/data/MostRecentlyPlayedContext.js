import { createContext, useState } from "react";

const MostRecentlyPlayedContext = createContext();

export function MostRecentlyPlayedProvider({children}) {
    const [userMostRecentlyPlayed, setUserMostRecentlyPlayed] = useState([]);


    const updateMostRecentlyPlayed = (mostRecentlyPlayedListList) => {
        setUserMostRecentlyPlayed(userMostRecentlyPlayed => userMostRecentlyPlayed.concat(mostRecentlyPlayedListList))
    }

    return (
        <MostRecentlyPlayedContext.Provider 
            value = {{ 
                userMostRecentlyPlayed,
                updateMostRecentlyPlayed 
            }}
        >
            {children}
        </MostRecentlyPlayedContext.Provider>
    );
};

export default MostRecentlyPlayedContext;