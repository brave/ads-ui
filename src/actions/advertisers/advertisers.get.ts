import axios from "axios";

import { IAdvertiserAction, IAdvertiserPayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const GET_ADVERTISERS_START = "GETADVERTISERSSTART";
export const GetAdvertisersStart = (): IAdvertiserAction => ({
  payload: null,
  type: GET_ADVERTISERS_START,
});

export const GET_ADVERTISERS_SUCCESSFUL = "GETADVERTISERSUCCESSFUL";
export const GetAdvertiserSuccessful = (
  payload: IAdvertiserPayload[]
): IAdvertiserAction => ({
  payload,
  type: GET_ADVERTISERS_SUCCESSFUL,
});

export const GET_ADVERTISERS_FAILD = "GETADVERTISERSFAILD";
export const GetAdvertisersFaild = (): IAdvertiserAction => ({
  payload: null,
  type: GET_ADVERTISERS_FAILD,
});

export const GetAdvertisers = (auth: IAuthPayload, userId?: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetAdvertisersStart);
      const response = await axios.get(
        `${import.meta.env.REACT_APP_SERVER_ADDRESS}/advertiser`,
        {
          headers: {
            "-x-user": userId,
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(GetAdvertiserSuccessful(response.data));
      dispatch(OpenSnackBar("Advertiser Get Successfully"));
      return Promise.resolve(response.data);
      // TODO: Remove w/ redux
    } catch (error: any) {
      dispatch(GetAdvertisersFaild());
      if (error.response) {
        dispatch(
          OpenSnackBar(`Get Advertisers  failed: ${error.response.data.error}`)
        );
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Advertisers  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Advertisers  Failed: ${error.message}`));
      }
      return Promise.reject(error);
    }
  };
};
