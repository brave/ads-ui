export interface IUserAction {
  type: string;
  payload: IUserPayload[] | IUserPayload | null;
}

export interface IUserPayload {
  id: string;
  email: string;
  fullName: string;
  modifiedAt: string;
  createdAt: string;
  role: string;
}
