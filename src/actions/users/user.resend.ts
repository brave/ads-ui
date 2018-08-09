import axios from "axios";

import { OpenSnackBar } from "../snackbar";

import { IAuthPayload } from "../auth";
import { IUserAction, IUserPayload } from "./users.interface";

export const USER_RESEND_START = "USERRESENDSTART";
export const UserResendStart = (payload: IUserPayload): IUserAction => ({
  payload,
  type: USER_RESEND_START,
});

export const USER_RESEND_SUCCESSFUL = "USERRESENDSUCCESSFUL";
export const UserResendSuccessful = (payload: IUserPayload): IUserAction => ({
  payload,
  type: USER_RESEND_SUCCESSFUL,
});

export const USER_RESEND_FAILED = "USERRESENDFAILED";
export const UserResendFailed = (): IUserAction => ({
  payload: null,
  type: USER_RESEND_FAILED,
});

export const UserResend = (user: IUserPayload, auth: IAuthPayload) => {
  return (dispatch: any) => {
    dispatch(UserResendStart(user));
    return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user/${user.id}/emailVerification`, {}, {
      headers: {
        "Authorization": `Bearer ${auth.accessToken}`,
        "Content-Type": "application/json",
      },
    }).then((response: any) => {
      dispatch(UserResendSuccessful(response.data));
      dispatch(OpenSnackBar("Resend Verification Successfully"));
      return Promise.resolve(response.data);
    }).catch((error: any) => {
      dispatch(UserResendFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Resend Verification Faild: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Resend Verification Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Resend Verification Faild: ${error.message}`));
      }
      return Promise.reject(error);
    });
  };
};
