import { ICampaignPayload } from "../campaigns";

export interface ICreativeAction {
  type: string;
  payload: ICreateCreativePayload | ICreativePayload | ICreativePayload[] | Partial<ICreativePayload> |null;
}

export interface ICreateCreativePayload {
  caption: string;
  imgUrl: string;
  body: string;
  targetUrl: string;
}

export interface ICreativePayload {
  id: string;
  caption: string;
  imgUrl: string;
  targetUrl: string;
  body: string;
  createdAt: string;
  modifiedAt: string;
  code: string;
  campaigns: ICampaignPayload[];
}
