import axios from "axios";

import { OpenSnackBar } from "../snackbar";

import { IAuthPayload } from "../auth";
import { IUserAction, IUserPayload } from "./users.interface";

export const USER_VERIFY_START = "USERVERIFYSTART";
export const UserVerifyStart = (payload: IUserPayload): IUserAction => ({
  payload,
  type: USER_VERIFY_START,
});

export const USER_VERIFY_SUCCESSFUL = "USERVERIFYSUCCESSFUL";
export const UserVerifySuccessful = (payload: IUserPayload): IUserAction => ({
  payload,
  type: USER_VERIFY_SUCCESSFUL,
});

export const USER_VERIFY_FAILED = "USERVERIFYFAILED";
export const UserVerifyFailed = (): IUserAction => ({
  payload: null,
  type: USER_VERIFY_FAILED,
});

export const UserVerify = (user: IUserPayload, auth: IAuthPayload, code: string) => {
  return (dispatch: any) => {
    dispatch(UserVerifyStart(user));
    return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/${user.id}/emailVerification/${code}`, {}, {
      headers: {
        "Authorization": `Bearer ${auth.accessToken}`,
        "Content-Type": "application/json",
      },
    }).then((response: any) => {
      dispatch(UserVerifySuccessful(response.data));
      dispatch(OpenSnackBar("Verify Email Successfully"));
      return Promise.resolve(response.data);
    }).catch((error: any) => {
      dispatch(UserVerifyFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Verify Email Faild: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Verify Email Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Verify Email Faild: ${error.message}`));
      }
      return Promise.reject(error);
    });
  };
};
