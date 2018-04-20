import { ICreativePayload } from "../creatives";

export interface ICampaignAction {
  type: string;
  payload: ICreateCampaignPayload | ICampaignPayload[] | ICampaignPayload | Partial<ICampaignPayload> | null;
}

export interface ICreateCampaignPayload {
  name: string;
}

export interface ICampaignPayload {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  modifiedAt: string;
  code: string;
  creatives: ICreativePayload[];
  flights: any[];
}
