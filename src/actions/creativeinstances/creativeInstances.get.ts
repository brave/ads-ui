import axios from "axios";

import { ICreativeInstanceAction, ICreativeInstancePayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const GET_CREATIVEINSTANCES_START = "GETCREATIVEINSTANCESSTART";
export const GetCreativeInstancesStart = (): ICreativeInstanceAction => ({
  payload: null,
  type: GET_CREATIVEINSTANCES_START,
});

export const GET_CREATIVEINSTANCES_SUCCESSFUL = "GETCREATIVEINSTANCESUCCESSFUL";
export const GetCreativeInstanceSuccessful = (payload: ICreativeInstancePayload[]): ICreativeInstanceAction => ({
  payload,
  type: GET_CREATIVEINSTANCES_SUCCESSFUL,
});

export const GET_CREATIVEINSTANCES_FAILD = "GETCREATIVEINSTANCESFAILD";
export const GetCreativeInstancesFaild = (): ICreativeInstanceAction => ({
  payload: null,
  type: GET_CREATIVEINSTANCES_FAILD,
});

export const GetCreativeInstances = (creativeInstanceId: string, auth: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetCreativeInstancesStart);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/creativeInstance?creativeSetId=${creativeInstanceId}`, {
          headers: {
            "Authorization": `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        });
      dispatch(GetCreativeInstanceSuccessful(response.data));
      dispatch(OpenSnackBar("CreativeInstance Get Successfully"));
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(GetCreativeInstancesFaild());
      if (error.response) {
        dispatch(OpenSnackBar(`Get CreativeInstances  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get CreativeInstances  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get CreativeInstances  Failed: ${error.message}`));
      }
    }
  };
};
