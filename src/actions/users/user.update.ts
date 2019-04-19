import axios from "axios";

import { OpenSnackBar } from "../snackbar";

import { IAuthPayload } from "../auth";
import { IUserAction, IUserPayload } from "./users.interface";

export const USER_UPDATE_START = "USERUPDATESTART";
export const UserUpdateStart = (payload: IUserPayload): IUserAction => ({
  payload,
  type: USER_UPDATE_START,
});

export const USER_UPDATE_SUCCESSFUL = "USERUPDATESUCCESSFUL";
export const UserUpdateSuccessful = (payload: IUserPayload): IUserAction => ({
  payload,
  type: USER_UPDATE_SUCCESSFUL,
});

export const USER_UPDATE_FAILED = "USERUPDATEFAILED";
export const UserUpdateFailed = (): IUserAction => ({
  payload: null,
  type: USER_UPDATE_FAILED,
});

export const UserUpdate = (payload: IUserPayload, user: IAuthPayload) => {
  return (dispatch: any) => {
    dispatch(UserUpdateStart(payload));
    return axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/user/${payload.id}`, payload, {
      headers: {
        "Authorization": `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
    }).then((response: any) => {
      dispatch(UserUpdateSuccessful(response.data));
      dispatch(OpenSnackBar("Update User Successfully"));
      return Promise.resolve(response.data);
    }).catch((error: any) => {
      dispatch(UserUpdateFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Update User  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Update User  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Update User  Failed: ${error.message}`));
      }
    });
  };
};
