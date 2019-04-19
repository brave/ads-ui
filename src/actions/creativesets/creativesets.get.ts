import axios from "axios";

import { ICreativeSetAction, ICreativeSetPayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const GET_CREATIVESETS_START = "GETCREATIVESETSSTART";
export const GetCreativeSetsStart = (): ICreativeSetAction => ({
  payload: null,
  type: GET_CREATIVESETS_START,
});

export const GET_CREATIVESETS_SUCCESSFUL = "GETCREATIVESETSUCCESSFUL";
export const GetCreativeSetSuccessful = (payload: ICreativeSetPayload[]): ICreativeSetAction => ({
  payload,
  type: GET_CREATIVESETS_SUCCESSFUL,
});

export const GET_CREATIVESETS_FAILD = "GETCREATIVESETSFAILD";
export const GetCreativeSetsFaild = (): ICreativeSetAction => ({
  payload: null,
  type: GET_CREATIVESETS_FAILD,
});

export const GetCreativeSets = (campaignId: string, auth: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetCreativeSetsStart);
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/campaign/${campaignId}/creativeSet`, {
        headers: {
          "Authorization": `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetCreativeSetSuccessful(response.data));
      dispatch(OpenSnackBar("CreativeSet Get Successfully"));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(GetCreativeSetsFaild());
      if (error.response) {
        dispatch(OpenSnackBar(`Get CreativeSets  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get CreativeSets  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get CreativeSets  Failed: ${error.message}`));
      }
    }
  };
};
