import axios from "axios";

import { IAuthPayload } from "../auth";

import { ICreateCreativeInstancePayload, ICreativeInstanceAction, ICreativeInstancePayload } from ".";
import { OpenSnackBar } from "../snackbar";

export const CREATE_CREATIVEINSTANCES_START = "CREATECREATIVEINSTANCESSTART";
export const CreateCreativeInstancesStart = (payload: ICreateCreativeInstancePayload): ICreativeInstanceAction => ({
  payload,
  type: CREATE_CREATIVEINSTANCES_START,
});

export const CREATE_CREATIVEINSTANCES_SUCCESSFUL = "CREATECREATIVEINSTANCESSUCCESSFUL";
export const CreateCreativeInstancesSuccessful = (payload: ICreativeInstancePayload): ICreativeInstanceAction => ({
  payload,
  type: CREATE_CREATIVEINSTANCES_SUCCESSFUL,
});

export const CREATE_CREATIVEINSTANCES_FAILED = "CREATECREATIVEINSTANCEFAILED";
export const CreateCreativeInstancesFailed = () => ({
  payload: null,
  type: CREATE_CREATIVEINSTANCES_FAILED,
});

export const CreateCreativeInstances = (creativeInstance: ICreateCreativeInstancePayload, user: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(CreateCreativeInstancesStart(creativeInstance));
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/creativeInstance`,
        creativeInstance, {
          headers: {
            "Authorization": `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        });
      dispatch(OpenSnackBar("CreativeInstance created Successfully"));
      dispatch(CreateCreativeInstancesSuccessful(response.data));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(CreateCreativeInstancesFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Create CreativeInstances  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Create CreativeInstances  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Create CreativeInstances  Failed: ${error.message}`));
      }
      return Promise.reject(error);
    }
  };
};
