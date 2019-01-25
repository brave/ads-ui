export interface IConfirmationTypeAction {
  type: string;
  payload: IConfirmationTypePayload | IConfirmationTypePayload[] | null;
}

export interface IConfirmationTypePayload {
  schema: any;
  name: string;
}
