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

export const UpdateCreatives = (creative: Partial<ICreativePayload>, user: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(UpdateCreativesStart(creative));
      const response = await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/creative/${creative.id}`, creative, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(UpdateCreativesSuccessful(response.data));
      dispatch(OpenSnackBar("Creative updated Successfully"));
    } catch (error) {
      dispatch(UpdateCreativesFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Update Creatives Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Update Creatives Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Update Creatives Faild: ${error.message}`));
      }
    }
  };
};
