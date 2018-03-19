export interface IUserAction {
  type: string;
  payload: ISignInPayload | ISignUpPayload;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignUpPayload {
  email: string;
  password: string;
}
