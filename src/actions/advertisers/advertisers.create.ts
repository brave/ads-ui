import axios from "axios";

import { IAuthPayload } from "../auth";

import { IAdvertiserAction, IAdvertiserPayload, ICreateAdvertiserPayload } from ".";
import { OpenSnackBar } from "../snackbar";

export const CREATE_ADVERTISERS_START = "CREATEADVERTISERSSTART";
export const CreateAdvertisersStart = (payload: ICreateAdvertiserPayload): IAdvertiserAction => ({
  payload,
  type: CREATE_ADVERTISERS_START,
});

export const CREATE_ADVERTISERS_SUCCESSFUL = "CREATEADVERTISERSSUCCESSFUL";
export const CreateAdvertisersSuccessful = (payload: IAdvertiserPayload): IAdvertiserAction => ({
  payload,
  type: CREATE_ADVERTISERS_SUCCESSFUL,
});

export const CREATE_ADVERTISERS_FAILED = "CREATEADVERTISERSFAILED";
export const CreateAdvertisersFailed = (): IAdvertiserAction => ({
  payload: null,
  type: CREATE_ADVERTISERS_FAILED,
});

export const CreateAdvertisers = (advertiser: ICreateAdvertiserPayload, auth: IAuthPayload, userId?: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(CreateAdvertisersStart(advertiser));
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/advertiser`, advertiser, {
        headers: {
          "-x-user": userId,
          "Authorization": `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(OpenSnackBar("Advertiser created Successfully"));
      dispatch(CreateAdvertisersSuccessful(response.data));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(CreateAdvertisersFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Create Advertiser Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Create Advertiser Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Create Advertiser Failed: ${error.message}`));
      }
      return Promise.reject(error);
    }
  };
};
