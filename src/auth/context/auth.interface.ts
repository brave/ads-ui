import React from "react";
import { ResponseUser } from "../lib";

export type IAdvertiser = {
  id: string;
  name: string;
  selfServiceCreate: boolean;
  selfServiceEdit: boolean;
  selfServiceSetPrice: boolean;
  publicKey?: string | null;
  agreed?: boolean;
};

export interface IAuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  setSessionUser: (u?: ResponseUser) => void;
  email?: string;
  role?: string;
  userId?: string;
  advertisers: IAdvertiser[];
}

export interface IAuthProviderProps {
  children?: React.ReactNode;
}
