import axios from "axios";

import { OpenSnackBar } from "../snackbar";

export const UPDATE_CREATIVES_START = "UPDATECREATIVESSTART";
export const UpdateCreativesStart = (payload: any) => ({
  payload,
  type: UPDATE_CREATIVES_START,
});

export const UPDATE_CREATIVES_SUCCESSFUL = "UPDATECREATIVESSUCCESSFUL";
export const UpdateCreativesSuccessful = (payload: any) => ({
  payload,
  type: UPDATE_CREATIVES_SUCCESSFUL,
});

export const UPDATE_CREATIVES_FAILED = "UPDATECREATIVEFAILED";
export const UpdateCreativesFailed = (payload: any) => ({
  payload,
  type: UPDATE_CREATIVES_FAILED,
});

export const UpdateCreatives = (creative: any, user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(UpdateCreativesStart(user));
      const response = await axios.put(`http://localhost:4000/creative/${creative.id}`, creative, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(UpdateCreativesSuccessful(response.data));
      dispatch(OpenSnackBar("Creative updated Successfully"));
    } catch (error) {
      dispatch(UpdateCreativesFailed(error));
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
