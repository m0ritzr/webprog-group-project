import React, { createContext, useState, useContext, useEffect } from "react";
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [settings, setSettings] = useState({});
  const [matches, setMatches] = useState([]);
  const [declined, setDeclined] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState(null);

  const [isSettingsInitialized, setIsSettingsInitialized] = useState(false);
  const [isAnimalsInitialized, setIsAnimalsInitialized] = useState(false);
  useEffect(() => {
    if (uid && isLoggedIn) {
      // Fetch data from Firebase when user logs in

      const settingsDocRef = doc(db, "settings", uid);
      const animalsDocRef = doc(db, "animals", uid);

      getDoc(settingsDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            console.log("Settings data:", docSnap.data());
            setSettings(docSnap.data());
            setIsSettingsInitialized(true);
          } else {
            console.log("No settings found for user");
          }
        })
        .catch((error) => {
          console.log("Error fetching settings:", error);
        });

      getDoc(animalsDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            console.log("Animals data:", docSnap.data());
            setMatches(docSnap.data().matches);
            setDeclined(docSnap.data().declined);
            setIsAnimalsInitialized(true);
          } else {
            console.log("No animals found for user");
          }
        })
        .catch((error) => {
          console.log("Error fetching animals:", error);
        });

      console.log("User Data Fetched");
    }
  }, [uid, isLoggedIn]);

  useEffect(() => {
    if (uid && isLoggedIn && isSettingsInitialized) {
      const docRef = doc(db, "settings", uid);
      setDoc(docRef, { ...settings }, { merge: true });
    }
  }, [settings, uid, isLoggedIn, isSettingsInitialized]);

  useEffect(() => {
    if (uid && isLoggedIn && isAnimalsInitialized) {
      const docRef = doc(db, "animals", uid);
      setDoc(docRef, { matches: matches, declined: declined }, { merge: true });
    }
  }, [matches, declined, uid, isLoggedIn, isAnimalsInitialized]);

  useEffect(() => {
    if (!isLoggedIn) {
      // Reset state variables when user logs out
      setSettings({});
      setMatches([]);
      setDeclined([]);
      setUid(null);
    }
  }, [isLoggedIn]);

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
    setUid,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
