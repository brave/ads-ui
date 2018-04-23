import axios from "axios";

import { ICreativeAction, ICreativePayload } from ".";
import { OpenSnackBar } from "../snackbar";

export const GET_CREATIVES_START = "GETCREATIVESSTART";
export const GetCreativesStart = (): ICreativeAction => ({
  payload: null,
  type: GET_CREATIVES_START,
});

export const GET_CREATIVES_SUCCESSFUL = "GETCREATIVESSUCCESSFUL";
export const GetCreativesSuccessful = (payload: ICreativePayload[]): ICreativeAction => ({
  payload,
  type: GET_CREATIVES_SUCCESSFUL,
});

export const GET_CREATIVES_FAILED = "GETCREATIVEFAILED";
export const GetCreativesFailed = (): ICreativeAction => ({
  payload: null,
  type: GET_CREATIVES_FAILED,
});

export const GetCreatives = (user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetCreativesStart());
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/creative`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetCreativesSuccessful(response.data));
      dispatch(OpenSnackBar("Creative get Successfully"));
    } catch (error) {
      dispatch(GetCreativesFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Get Creatives Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Creatives Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Creatives Faild: ${error.message}`));
      }
    }
  };
};
