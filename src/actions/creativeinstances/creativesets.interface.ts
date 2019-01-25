export interface ICreativeInstanceAction {
  type: string;
  payload: ICreateCreativeInstancePayload |
  ICreativeInstancePayload[] | ICreativeInstancePayload | Partial<ICreativeInstancePayload> | null;
}

export interface ICreateCreativeInstancePayload {
  creativeId: string;
  creativeSetId: string;
}

export interface ICreativeInstancePayload {
  id: string;
  creative: any;
  creativeSet: any;
}
