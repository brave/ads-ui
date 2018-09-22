export interface ICreativeTypeAction {
  type: string;
  payload: ICreativeTypePayload | ICreativeTypePayload[] | null;
}

export interface ICreativeTypePayload {
  code: string;
  name: string;
  platform: string;
  version: string;
  schema: any;
}
