import axios from "axios";

import { ISignInPayload, IUserAction } from "./user.interface";

export const SIGN_IN_START = "SIGNINSTART";
export const SignInStart = (payload: ISignInPayload): IUserAction => ({
  payload,
  type: SIGN_IN_START,
});

export const SIGN_IN_SUCCESSFUL = "SIGNINSUCCESSFUL";
export const SignInSuccessful = (payload: any): IUserAction => ({
  payload,
  type: SIGN_IN_SUCCESSFUL,
});

export const SIGN_IN_FAILED = "SIGNINFAILED";
export const SignInFailed = (payload: any): IUserAction => ({
  payload,
  type: SIGN_IN_FAILED,
});

export const SignIn = (payload: ISignInPayload) => {
  return (dispatch: any) => {
    dispatch(SignInStart(payload));
    return axios.post(`http://localhost:4000/auth/token`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response: any) => dispatch(SignInSuccessful(response.data)))
      .catch((error: any) => dispatch(SignInFailed(error)));
  };
};

export const SIGN_OUT = "SIGNOUT";
export const SignOut = (payload: any): IUserAction => ({
  payload,
  type: SIGN_OUT,
});
