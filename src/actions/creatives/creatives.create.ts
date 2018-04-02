import axios from "axios";

import { OpenSnackBar } from "../snackbar";

export const CREATE_CREATIVES_START = "CREATECREATIVESSTART";
export const CreateCreativesStart = (payload: any) => ({
  payload,
  type: CREATE_CREATIVES_START,
});

export const CREATE_CREATIVES_SUCCESSFUL = "CREATECREATIVESSUCCESSFUL";
export const CreateCreativesSuccessful = (payload: any) => ({
  payload,
  type: CREATE_CREATIVES_SUCCESSFUL,
});

export const CREATE_CREATIVES_FAILED = "CREATECREATIVEFAILED";
export const CreateCreativesFailed = (payload: any) => ({
  payload,
  type: CREATE_CREATIVES_FAILED,
});

export const CreateCreatives = (creative: any, user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(CreateCreativesStart(creative));
      const response = await axios.post(`http://localhost:4000/creative`, creative, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(OpenSnackBar("Creative created Successfully"));
      dispatch(CreateCreativesSuccessful(response.data));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(CreateCreativesFailed(error));
      if (error.response) {
        dispatch(OpenSnackBar(`Create Creatives Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Create Creatives Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Create Creatives Faild: ${error.message}`));
      }
    }
  };
};
