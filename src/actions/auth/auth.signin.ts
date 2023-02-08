import axios from "axios";

import { IAuthAction, IAuthPayload, ISignInPayload } from "./auth.interface";
import {OpenSnackBar} from "../snackbar";

export const SIGN_IN_START = "SIGNINSTART";
export const SignInStart = (payload: ISignInPayload): IAuthAction => ({
  payload,
  type: SIGN_IN_START,
});

export const SIGN_IN_SUCCESSFUL = "SIGNINSUCCESSFUL";
export const SignInSuccessful = (payload: IAuthPayload): IAuthAction => ({
  payload,
  type: SIGN_IN_SUCCESSFUL,
});

export const SIGN_IN_FAILED = "SIGNINFAILED";
export const SignInFailed = (payload: any): IAuthAction => ({
  payload,
  type: SIGN_IN_FAILED,
});

export const SignIn = (payload: ISignInPayload) => {
  return async (dispatch: any) => {
    if (payload.accessToken) {
      try {
        dispatch(SignInStart(payload));
        dispatch(SignInSuccessful({ accessToken: payload.accessToken }));
        return Promise.resolve({ accessToken: payload.accessToken });
      } catch (error: any) {
        dispatch(SignInFailed(error));
      }
    }
    else {
      try {
        dispatch(SignInStart(payload));
        const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/auth/token`, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(SignInSuccessful(response.data));
        return Promise.resolve(response.data);
        // TODO: Remove w/ redux
      } catch (error: any) {
        dispatch(SignInFailed(error));
        if (error.response) {
          dispatch(OpenSnackBar(`Sign In  Failed: ${error.response.data.error}`));
        } else if (error.request) {
          dispatch(OpenSnackBar(`Sign In  Failed: Network Error`));
        } else {
          dispatch(OpenSnackBar(`Sign In  Failed: ${error.message}`));
        }
        return Promise.reject(error);
      }
    }
  };
};

export const SIGN_OUT = "SIGNOUT";
export const SignOut = (): IAuthAction => ({
  payload: null,
  type: SIGN_OUT,
});
