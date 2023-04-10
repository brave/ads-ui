import React from "react";
import { IAdvertiser } from "../../actions";

export interface IJwtPayload {
  email?: string;
  emailVerified?: boolean;
  expiresIn?: number;
  id?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export interface IAuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  accessToken: string;
  setAccessToken: (token?: string) => void;
  setActiveAdvertiser: (a?: IAdvertiser) => void;
  email?: string;
  role?: string;
  userId?: string;
  emailVerified?: boolean;
  advertiser: IAdvertiser;
}

export interface IAuthProviderProps {
  children?: React.ReactNode;
}
