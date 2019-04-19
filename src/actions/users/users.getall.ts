import axios from "axios";

import { OpenSnackBar } from "../snackbar";

import { IAuthPayload } from "../auth";
import { IUserAction, IUserPayload } from "./users.interface";

export const GETALL_USER_START = "GETALLUSERSTART";
export const GetAllUserStart = (): IUserAction => ({
  payload: null,
  type: GETALL_USER_START,
});

export const GETALL_USER_SUCCESSFUL = "GETALLUSERSUCCESSFUL";
export const GetAllUserSuccessful = (payload: IUserPayload[]): IUserAction => ({
  payload,
  type: GETALL_USER_SUCCESSFUL,
});

export const GETALL_USER_FAILED = "GETALLUSERFAILED";
export const GetAllUserFailed = (): IUserAction => ({
  payload: null,
  type: GETALL_USER_FAILED,
});

export const GetAllUser = (user: IAuthPayload) => {
  return (dispatch: any) => {
    dispatch(GetAllUserStart());
    return axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/user`, {
      headers: {
        "Authorization": `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
    }).then((response: any) => {
      dispatch(GetAllUserSuccessful(response.data));
      dispatch(OpenSnackBar("Got All Users Successfully"));
    }).catch((error: any) => {
      dispatch(GetAllUserFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Get All Users Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get All Users Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get All Users Failed: ${error.message}`));
      }
    });
  };
};
