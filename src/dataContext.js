import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const useData = () => {
    return useContext(DataContext);
}

export const DataProvider = ({ children }) => {
    const [settings, setSettings] = useState({});
    const [matches, setMatches] = useState([]);
    const [declined, setDeclined] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [uid, setUid] = useState(null);

    const value = {
        settings,
        setSettings,
        matches,
        setMatches,
        declined,
        setDeclined,
        isLoggedIn,
        setIsLoggedIn,
        uid,
        setUid
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
