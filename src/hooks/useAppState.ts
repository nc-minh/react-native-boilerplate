import {localStorageKey} from "@/constants/localStorage";
import {storage} from "@/localStorage";
import {getUser} from "@/localStorage/user";
import {useAuthenStore} from "@/store/useAuthenStore";
import {useEffect, useRef, useState} from "react";
import {AppState} from "react-native";
import {useShallow} from "zustand/react/shallow";

const useAppState = () => {
  const {setUser, setAccessToken} = useAuthenStore(
    useShallow(state => ({
      setUser: state.setUser,
      setAccessToken: state.setAccessToken,
    })),
  );

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);

      if (appState.current === "active") {
        const accessToken = storage.getString(localStorageKey.ACCESS_TOKEN);
        if (accessToken) setAccessToken(accessToken);

        const user = getUser();
        if (user) setUser(user);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [setAccessToken, setUser]);

  return {
    appStateVisible,
  };
};

export default useAppState;
