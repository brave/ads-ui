export interface ICampaignAction {
  type: string;
  payload: ICreateCampaignPayload | ICampaignPayload[] | ICampaignPayload | Partial<ICampaignPayload> | null;
}

export interface ICreateCampaignPayload {
  name: string;
  advertiserId: string;
  startat: Date;
  endAt: Date;
  type: string;
  source: string;
  budget: number;
  dailyBudget: number;
  dailyCap: number;
}

export interface ICampaignPayload {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  modifiedAt: string;
  code: string;
  geotargets: any[];
}
