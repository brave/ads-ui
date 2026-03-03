import { createContext } from "react";
import { IAuthState } from "./auth.interface";

export const initialState: IAuthState = {
  isInitialized: false,
  isAuthenticated: false,
  setSessionUser: () => {},
  advertisers: [],
};

export const IAuthContext = createContext<IAuthState>(initialState);
