import axios from "axios";
import { Dispatch } from "react-redux";

import { OpenSnackBar } from "../snackbar";

import { ISignUpPayload, ISignUpSuccessfulPayload, IUserAction } from "./user.interface";

export const SIGN_UP_START = "SIGNUPSTART";
export const SignUpStart = (payload: ISignUpPayload): IUserAction => ({
  payload,
  type: SIGN_UP_START,
});

export const SIGN_UP_SUCCESSFUL = "SIGNUPSUCCESSFUL";
export const SignUpSuccessful = (payload: ISignUpSuccessfulPayload): IUserAction => ({
  payload,
  type: SIGN_UP_SUCCESSFUL,
});

export const SIGN_UP_FAILED = "SIGNUPFAILED";
export const SignUpFailed = (): IUserAction => ({
  payload: null,
  type: SIGN_UP_FAILED,
});

export const SignUp = (payload: ISignUpPayload) => {
  return (dispatch: Dispatch<ISignUpPayload>) => {
    dispatch(SignUpStart(payload));
    return axios.post(`http://localhost:4000/user`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response: any) => {
      dispatch(SignUpSuccessful(response.data));
      dispatch(OpenSnackBar("Signed Up Successfully"));
    }).catch((error: any) => {
      dispatch(SignUpFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Sign Up Faild: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Sign Up Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Sign Up Faild: ${error.message}`));
      }
    });
  };
};
