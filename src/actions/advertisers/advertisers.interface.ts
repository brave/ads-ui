export interface IAdvertiserAction {
  type: string;
  payload: ICreateAdvertiserPayload | IAdvertiserPayload[] | IAdvertiserPayload | Partial<IAdvertiserPayload> | null;
}

export interface ICreateAdvertiserPayload {
  name: string;
}

export interface IAdvertiserPayload {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  modifiedAt: string;
  code: string;
  flights: any[];
}
