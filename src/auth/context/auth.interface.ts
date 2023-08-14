import { ReactNode } from "react";
import { ResponseUser } from "../lib";
import { PaymentType } from "graphql/types";

export type IAdvertiser = {
  id: string;
  name: string;
  selfServiceCreate: boolean;
  selfServiceEdit: boolean;
  selfServiceSetPrice: boolean;
  selfServicePaymentType: PaymentType;
  publicKey?: string | null;
  agreed?: boolean;
};

export interface IAuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  setSessionUser: (u?: ResponseUser) => void;
  fullName?: string;
  email?: string;
  role?: string;
  userId?: string;
  advertisers: IAdvertiser[];
}

export interface IAuthProviderProps {
  children?: ReactNode;
}
