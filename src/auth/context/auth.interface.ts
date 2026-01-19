import { ReactNode } from "react";
import { ResponseUser } from "../lib";
import { PaymentType } from "@/graphql-client/graphql";

export type IAdvertiser = {
  id: string;
  name: string;
  selfServiceManageCampaign: boolean;
  selfServiceSetPrice: boolean;
  selfServicePaymentType: PaymentType;
  agreed?: boolean;
};

export type AdvertiserMessage = {
  id: string;
  message: string;
  title: string;
  actionUrl?: string;
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
  advertiserMessage?: AdvertiserMessage | null;
}

export interface IAuthProviderProps {
  children?: ReactNode;
}
