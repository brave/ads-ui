import axios from "axios";

import { ISignUpPayload, IUserAction } from "./user.interface";

export const SIGN_UP_START = "SIGNUPSTART";
export const SignUpStart = (payload: ISignUpPayload): IUserAction => ({
  payload,
  type: SIGN_UP_START,
});

export const SIGN_UP_SUCCESSFUL = "SIGNUPSUCCESSFUL";
export const SignUpSuccessful = (payload: any): IUserAction => ({
  payload,
  type: SIGN_UP_SUCCESSFUL,
});

export const SIGN_UP_FAILED = "SIGNUPFAILED";
export const SignUpFailed = (payload: any): IUserAction => ({
  payload,
  type: SIGN_UP_FAILED,
});

export const SignUp = (payload: ISignUpPayload) => {
  return (dispatch: any) => {
    dispatch(SignUpStart(payload));
    return axios.post(`http://localhost:4000/user`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response: any) => dispatch(SignUpSuccessful(response.data)))
      .catch((error: any) => dispatch(SignUpFailed(error)));
  };
};
