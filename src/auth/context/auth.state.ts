import { IAuthState } from "./auth.interface";
import { createContext } from "react";

export const initialState: IAuthState = {
  isInitialized: false,
  isAuthenticated: false,
  setSessionUser: () => {},
  advertisers: [],
};

export const IAuthContext = createContext<IAuthState>(initialState);
