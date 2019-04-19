import axios from "axios";

import { IAdvertiserAction, IAdvertiserPayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const UPDATE_ADVERTISERS_START = "UPDATEADVERTISERSSTART";
export const UpdateAdvertisersStart = (payload: Partial<IAdvertiserPayload>): IAdvertiserAction => ({
  payload,
  type: UPDATE_ADVERTISERS_START,
});

export const UPDATE_ADVERTISERS_SUCCESSFUL = "UPDATEADVERTISERSSUCCESSFUL";
export const UpdateAdvertisersSuccessful = (payload: IAdvertiserPayload): IAdvertiserAction => ({
  payload,
  type: UPDATE_ADVERTISERS_SUCCESSFUL,
});

export const UPDATE_ADVERTISERS_FAILED = "UPDATEADVERTISERFAILED";
export const UpdateAdvertisersFailed = (): IAdvertiserAction => ({
  payload: null,
  type: UPDATE_ADVERTISERS_FAILED,
});

export const UpdateAdvertisers = (advertiser: Partial<IAdvertiserPayload>, auth: IAuthPayload, userId?: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(UpdateAdvertisersStart(advertiser));
      const response = await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/advertiser/${advertiser.id}`,
        advertiser, {
          headers: {
            "-x-user": userId,
            "Authorization": `Bearer ${auth.accessToken}`,
            "Content-Type": "application/json",
          },
        });
      dispatch(UpdateAdvertisersSuccessful(response.data));
      dispatch(OpenSnackBar("Advertiser updated Successfully"));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(UpdateAdvertisersFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Update Advertiser  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Update Advertiser  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Update Advertiser  Failed: ${error.message}`));
      }
      return Promise.reject(error);
    }
  };
};
