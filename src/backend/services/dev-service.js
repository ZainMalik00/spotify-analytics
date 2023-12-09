import { createContext, useState } from "react";
import React from 'react';

const DevServiceContext = createContext();

export function DevServiceProvider({children}) {
    const [isDevMode, setIsDevMode] = useState("false");

    const updateIsDevMode = () => {
        const IsDevModeTemporaryValue = checkIsDevMode().toString();
        if(IsDevModeTemporaryValue === "true" ){
            setIsDevMode(IsDevModeTemporaryValue.toString());
        }
    }

    const checkIsDevMode = () => {
        return '_self' in React.createElement('div');
    }

    return (
        <DevServiceContext.Provider 
            value = {{ 
                isDevMode,
                updateIsDevMode,
            }}
        >
            {children}
        </DevServiceContext.Provider>
    );
};

export default DevServiceContext;