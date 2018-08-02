export interface IUserAction {
  type: string;
  payload: IUserPayload[] | null;
}

export interface IUserPayload {
  id: string;
  email: string;
  organizationName: string;
  modifiedAt: string;
  createdAt: string;
  role: string;
}
