import { ICampaignPayload } from "../campaigns";

export interface ICreativeAction {
  type: string;
  payload: ICreateCreativePayload | ICreativePayload | ICreativePayload[] | Partial<ICreativePayload> |null;
}

export interface ICreateCreativePayload {
  caption: string;
  body: string;
  targetUrl: string;
  name: string;
}

export interface ICreativePayload {
  id: string;
  caption: string;
  targetUrl: string;
  body: string;
  createdAt: string;
  modifiedAt: string;
  name: string;
  campaigns: ICampaignPayload[];
}
