import axios from "axios";

import { ICreativeSetAction, ICreativeSetPayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const UPDATE_CREATIVESETS_START = "UPDATECREATIVESETSSTART";
export const UpdateCreativeSetsStart = (payload: Partial<ICreativeSetPayload>): ICreativeSetAction => ({
  payload,
  type: UPDATE_CREATIVESETS_START,
});

export const UPDATE_CREATIVESETS_SUCCESSFUL = "UPDATECREATIVESETSSUCCESSFUL";
export const UpdateCreativeSetsSuccessful = (payload: ICreativeSetPayload): ICreativeSetAction => ({
  payload,
  type: UPDATE_CREATIVESETS_SUCCESSFUL,
});

export const UPDATE_CREATIVESETS_FAILED = "UPDATECREATIVESETFAILED";
export const UpdateCreativeSetsFailed = (): ICreativeSetAction => ({
  payload: null,
  type: UPDATE_CREATIVESETS_FAILED,
});

// tslint:disable-next-line:max-line-length
export const UpdateCreativeSets = (campaignId: string, creativeSet: Partial<ICreativeSetPayload>, user: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(UpdateCreativeSetsStart(creativeSet));
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_ADDRESS}/campaign/${campaignId}/creativeSet/${creativeSet.id}`, creativeSet, {
          headers: {
            "Authorization": `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        });
      dispatch(UpdateCreativeSetsSuccessful(response.data));
      dispatch(OpenSnackBar("CreativeSet updated Successfully"));
    } catch (error: any) {
      dispatch(UpdateCreativeSetsFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Update CreativeSets  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Update CreativeSets  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Update CreativeSets  Failed: ${error.message}`));
      }
    }
  };
};
