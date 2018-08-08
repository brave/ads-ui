import axios from "axios";

import { OpenSnackBar } from "../snackbar";

import { IAuthPayload } from "../auth";
import { IUserAction, IUserPayload } from "./users.interface";

export const USER_CREATE_START = "USERCREATESTART";
export const UserCreateStart = (payload: IUserPayload): IUserAction => ({
  payload,
  type: USER_CREATE_START,
});

export const USER_CREATE_SUCCESSFUL = "USERCREATESUCCESSFUL";
export const UserCreateSuccessful = (payload: IUserPayload): IUserAction => ({
  payload,
  type: USER_CREATE_SUCCESSFUL,
});

export const USER_CREATE_FAILED = "USERCREATEFAILED";
export const UserCreateFailed = (): IUserAction => ({
  payload: null,
  type: USER_CREATE_FAILED,
});

export const UserCreate = (payload: IUserPayload, user: IAuthPayload) => {
  return (dispatch: any) => {
    dispatch(UserCreateStart(payload));
    return axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/user`, payload, {
      headers: {
        "Authorization": `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
    }).then((response: any) => {
      dispatch(UserCreateSuccessful(response.data));
      dispatch(OpenSnackBar("Create User Successfully"));
      return Promise.resolve(response.data);
    }).catch((error: any) => {
      dispatch(UserCreateFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Create User Faild: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Create User Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Create User Faild: ${error.message}`));
      }
    });
  };
};
