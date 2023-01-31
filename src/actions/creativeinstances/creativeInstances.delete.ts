import axios from "axios";

import { ICreativeInstanceAction, ICreativeInstancePayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const DELETE_CREATIVEINSTANCES_START = "DELETECREATIVEINSTANCESSTART";
export const DeleteCreativeInstancesStart = (payload: Partial<ICreativeInstancePayload>): ICreativeInstanceAction => ({
  payload,
  type: DELETE_CREATIVEINSTANCES_START,
});

export const DELETE_CREATIVEINSTANCES_SUCCESSFUL = "DELETECREATIVEINSTANCESSUCCESSFUL";
export const DeleteCreativeInstancesSuccessful = (payload: ICreativeInstancePayload): ICreativeInstanceAction => ({
  payload,
  type: DELETE_CREATIVEINSTANCES_SUCCESSFUL,
});

export const DELETE_CREATIVEINSTANCES_FAILED = "DELETECREATIVEINSTANCEFAILED";
export const DeleteCreativeInstancesFailed = (): ICreativeInstanceAction => ({
  payload: null,
  type: DELETE_CREATIVEINSTANCES_FAILED,
});

// tslint:disable-next-line:max-line-length
export const DeleteCreativeInstances = (creativeInstance: ICreativeInstancePayload, user: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(DeleteCreativeInstancesStart(creativeInstance));
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_ADDRESS}/creativeInstance/${creativeInstance.id}`, {
          headers: {
            "Authorization": `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        });
      dispatch(DeleteCreativeInstancesSuccessful(creativeInstance));
      dispatch(OpenSnackBar("CreativeInstance deleted Successfully"));
    } catch (error: any) {
      dispatch(DeleteCreativeInstancesFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Delete CreativeInstances  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Delete CreativeInstances  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Delete CreativeInstances  Failed: ${error.message}`));
      }
    }
  };
};
