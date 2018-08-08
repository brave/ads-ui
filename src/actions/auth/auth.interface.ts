export interface IAuthAction {
  type: string;
  payload: ISignInPayload |
  ISignUpPayload |
  IAuthPayload |
  ISignUpSuccessfulPayload |
  ISignUpSuccessfulPayload[] |
  null;
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
  fullName: string;
  modifiedAt: string;
  createdAt: string;
  role: string;
}

export interface IAuthPayload {
  accessToken: string;
}
