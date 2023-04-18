import React from "react";
import { UserFragment } from "../../graphql/user.generated";

export type IAdvertiser = {
  id: string;
  name: string;
  selfServiceCreate: boolean;
  selfServiceEdit: boolean;
  selfServiceSetPrice: boolean;
};

export interface IAuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  setActiveAdvertiser: (a?: IAdvertiser) => void;
  setSessionUser: (u?: UserFragment) => void;
  email?: string;
  role?: string;
  userId?: string;
  emailVerified?: boolean;
  advertiser: IAdvertiser;
}

export interface IAuthProviderProps {
  children?: React.ReactNode;
}
