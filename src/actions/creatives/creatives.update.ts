import axios from "axios";

import { ICreativeAction, ICreativePayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const UPDATE_CREATIVES_START = "UPDATECREATIVESSTART";
export const UpdateCreativesStart = (payload: Partial<ICreativePayload>): ICreativeAction => ({
  payload,
  type: UPDATE_CREATIVES_START,
});

export const UPDATE_CREATIVES_SUCCESSFUL = "UPDATECREATIVESSUCCESSFUL";
export const UpdateCreativesSuccessful = (payload: ICreativePayload): ICreativeAction => ({
  payload,
  type: UPDATE_CREATIVES_SUCCESSFUL,
});

export const UPDATE_CREATIVES_FAILED = "UPDATECREATIVEFAILED";
export const UpdateCreativesFailed = (): ICreativeAction => ({
  payload: null,
  type: UPDATE_CREATIVES_FAILED,
});

export const UpdateCreatives = (creative: Partial<ICreativePayload>, auth: IAuthPayload, userId?: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(UpdateCreativesStart(creative));
      const response = await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/creative/${creative.id}`, creative, {
        headers: {
          "-x-user": userId,
          "Authorization": `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(UpdateCreativesSuccessful(response.data));
      dispatch(OpenSnackBar("Creative updated Successfully"));
    } catch (error: any) {
      dispatch(UpdateCreativesFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Update Creatives  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Update Creatives  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Update Creatives  Failed: ${error.message}`));
      }
    }
  };
};
