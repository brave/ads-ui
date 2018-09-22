import axios from "axios";

import { ICreativeTypePayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const GET_CREATIVETYPES_START = "GETCREATIVETYPESSTART";
export const GetCreativeTypesStart = () => ({
  payload: null,
  type: GET_CREATIVETYPES_START,
});

export const GET_CREATIVETYPES_SUCCESSFUL = "GETCREATIVETYPESSUCCESSFUL";
export const GetCreativeTypesSuccessful = (payload: ICreativeTypePayload) => ({
  payload,
  type: GET_CREATIVETYPES_SUCCESSFUL,
});

export const GET_CREATIVETYPES_FAILD = "GETCREATIVETYPESFAILD";
export const GetCreativeTypesFaild = () => ({
  payload: null,
  type: GET_CREATIVETYPES_FAILD,
});

export const GetCreativeTypes = (auth: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetCreativeTypesStart());
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/creative-type`, {
        headers: {
          "Authorization": `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetCreativeTypesSuccessful(response.data));
      dispatch(OpenSnackBar("Creative Types Get Successfully"));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(GetCreativeTypesFaild());
      if (error.response) {
        dispatch(OpenSnackBar(`Get Creative Types Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Creative Types Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Creative Types Faild: ${error.message}`));
      }
      return Promise.reject(error);
    }
  };
};
