import {create} from "zustand";

import {localStorageKey} from "@/constants/localStorage";
import {storage} from "@/localStorage";
import User from "@/types/user/User";

type InitialState = {
  user?: User;
  accessToken?: string;
};

type Action = {
  setUser: (user: User) => void;
  setAccessToken: (accessToken: string) => void;
};

const initialState: InitialState = {
  user: undefined,
  accessToken: undefined,
};

export const useAuthenStore = create<InitialState & Action>(set => ({
  ...initialState,
  setUser: user => {
    storage.set(localStorageKey.USER, JSON.stringify(user));
    return set({user});
  },
  setAccessToken: accessToken => {
    storage.set(localStorageKey.ACCESS_TOKEN, accessToken);
    return set({accessToken});
  },
}));
