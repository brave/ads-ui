import axios from "axios";

import { OpenSnackBar } from "../snackbar";

import { IAuthAction, ISignUpPayload, ISignUpSuccessfulPayload } from "./auth.interface";

export const SIGN_UP_START = "SIGNUPSTART";
export const SignUpStart = (payload: ISignUpPayload): IAuthAction => ({
  payload,
  type: SIGN_UP_START,
});

export const SIGN_UP_SUCCESSFUL = "SIGNUPSUCCESSFUL";
export const SignUpSuccessful = (payload: ISignUpSuccessfulPayload): IAuthAction => ({
  payload,
  type: SIGN_UP_SUCCESSFUL,
});

export const SIGN_UP_FAILED = "SIGNUPFAILED";
export const SignUpFailed = (): IAuthAction => ({
  payload: null,
  type: SIGN_UP_FAILED,
});

export const SignUp = (payload: ISignUpPayload) => {
  return (dispatch: any) => {
    dispatch(SignUpStart(payload));
    return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response: any) => {
      dispatch(SignUpSuccessful(response.data));
      dispatch(OpenSnackBar("Signed Up Successfully"));
    }).catch((error: any) => {
      dispatch(SignUpFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Sign Up  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Sign Up  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Sign Up  Failed: ${error.message}`));
      }
    });
  };
};
