export interface ICreativeSetAction {
  type: string;
  payload: ICreateCreativeSetPayload |
  ICreativeSetPayload[] | ICreativeSetPayload | Partial<ICreativeSetPayload> | null;
}

export interface ICreateCreativeSetPayload {
  execution: string;
  perDay: number;
  totalMax: number;
  segments: any[];
}

export interface ICreativeSetPayload {
  id: string;
  campaignId: string;
  state: string;
  createdAt: string;
  modifiedAt: string;
  execution: string;
  perDay: number;
  totalMax: number;
  segments: any[];
}
