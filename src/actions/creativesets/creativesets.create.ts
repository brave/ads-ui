import axios from "axios";

import { IAuthPayload } from "../auth";

import { ICreateCreativeSetPayload, ICreativeSetAction, ICreativeSetPayload } from ".";
import { OpenSnackBar } from "../snackbar";

export const CREATE_CREATIVESETS_START = "CREATECREATIVESETSSTART";
export const CreateCreativeSetsStart = (payload: ICreateCreativeSetPayload): ICreativeSetAction => ({
  payload,
  type: CREATE_CREATIVESETS_START,
});

export const CREATE_CREATIVESETS_SUCCESSFUL = "CREATECREATIVESETSSUCCESSFUL";
export const CreateCreativeSetsSuccessful = (payload: ICreativeSetPayload): ICreativeSetAction => ({
  payload,
  type: CREATE_CREATIVESETS_SUCCESSFUL,
});

export const CREATE_CREATIVESETS_FAILED = "CREATECREATIVESETFAILED";
export const CreateCreativeSetsFailed = () => ({
  payload: null,
  type: CREATE_CREATIVESETS_FAILED,
});

export const CreateCreativeSets = (campaignId: string, creativeSet: ICreateCreativeSetPayload, user: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(CreateCreativeSetsStart(creativeSet));
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/campaign/${campaignId}/creativeSet`,
        creativeSet, {
          headers: {
            "Authorization": `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        });
      dispatch(OpenSnackBar("CreativeSet created Successfully"));
      dispatch(CreateCreativeSetsSuccessful(response.data));
      return Promise.resolve(response.data);
    } catch (error: any) {
      dispatch(CreateCreativeSetsFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Create CreativeSets  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Create CreativeSets  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Create CreativeSets  Failed: ${error.message}`));
      }
      return Promise.reject(error);
    }
  };
};
