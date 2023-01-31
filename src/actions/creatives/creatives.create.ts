import axios from "axios";

import { ICreateCreativePayload, ICreativeAction, ICreativePayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const CREATE_CREATIVES_START = "CREATECREATIVESSTART";
export const CreateCreativesStart = (payload: ICreateCreativePayload): ICreativeAction => ({
  payload: null,
  type: CREATE_CREATIVES_START,
});

export const CREATE_CREATIVES_SUCCESSFUL = "CREATECREATIVESSUCCESSFUL";
export const CreateCreativesSuccessful = (payload: ICreativePayload): ICreativeAction => ({
  payload,
  type: CREATE_CREATIVES_SUCCESSFUL,
});

export const CREATE_CREATIVES_FAILED = "CREATECREATIVEFAILED";
export const CreateCreativesFailed = (): ICreativeAction => ({
  payload: null,
  type: CREATE_CREATIVES_FAILED,
});

export const CreateCreatives = (creative: ICreateCreativePayload, auth: IAuthPayload, userId?: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(CreateCreativesStart(creative));
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/creative`, creative, {
        headers: {
          "-x-user": userId,
          "Authorization": `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(OpenSnackBar("Creative created Successfully"));
      dispatch(CreateCreativesSuccessful(response.data));
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(CreateCreativesFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Create Creatives  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Create Creatives  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Create Creatives  Failed: ${error.message}`));
      }
      return Promise.reject(error);
    }
  };
};
