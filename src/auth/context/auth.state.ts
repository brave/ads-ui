import { IAuthState } from "./auth.interface";
import { createContext } from "react";
import { Advertiser } from "../lib";

export const initialState: IAuthState = {
  isInitialized: false,
  isAuthenticated: false,
  setSessionUser: () => {},
  advertisers: [],
};

export const IAuthContext = createContext<IAuthState>(initialState);
