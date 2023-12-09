import { createContext, useState } from "react";
import React from 'react';

const DevServiceContext = createContext();

export function DevServiceProvider({children}) {
    const [isDevMode, setIsDevMode] = useState("false");

    const updateIsDevMode = () => {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            setIsDevMode("true");
        } else {
            setIsDevMode("false");
        }
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