import { IAuthState } from "./auth.interface";
import { createContext } from "react";

export const initialState: IAuthState = {
  isInitialized: false,
  isAuthenticated: false,
  setSessionUser: () => {},
  setActiveAdvertiser: () => {},
  advertiser: {
    selfServiceSetPrice: false,
    selfServiceCreate: false,
    selfServiceEdit: false,
    id: "",
    name: "",
  },
};

export const IAuthContext = createContext<IAuthState>(initialState);
