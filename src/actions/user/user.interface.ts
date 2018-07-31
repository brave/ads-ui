export interface IUserAction {
  type: string;
  payload: ISignInPayload | ISignUpPayload | IUserPayload | ISignUpSuccessfulPayload | null;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignUpPayload {
  email: string;
  password: string;
}

export interface ISignUpSuccessfulPayload {
  id: string;
  email: string;
  organizationName: string;
  modifiedAt: string;
  createdAt: string;
  username: string;
}

export interface IUserPayload {
  accessToken: string;
}
