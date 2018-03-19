export interface IUserAction {
  type: string;
  payload: ISignInPayload | ISignUpPayload | ISignInSuccessfulPayload;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignUpPayload {
  email: string;
  password: string;
}

export interface ISignInSuccessfulPayload {
  accessToken: string;
  expiresIn: number;
  email: string;
  id: string;
}
