import axios from "axios";

import { IAuthPayload } from "../auth";

import { ICampaignAction, ICampaignPayload, ICreateCampaignPayload } from ".";
import { OpenSnackBar } from "../snackbar";

export const CREATE_CAMPAIGNS_START = "CREATECAMPAIGNSSTART";
export const CreateCampaignsStart = (payload: ICreateCampaignPayload): ICampaignAction => ({
  payload,
  type: CREATE_CAMPAIGNS_START,
});

export const CREATE_CAMPAIGNS_SUCCESSFUL = "CREATECAMPAIGNSSUCCESSFUL";
export const CreateCampaignsSuccessful = (payload: ICampaignPayload): ICampaignAction => ({
  payload,
  type: CREATE_CAMPAIGNS_SUCCESSFUL,
});

export const CREATE_CAMPAIGNS_FAILED = "CREATECAMPAIGNFAILED";
export const CreateCampaignsFailed = () => ({
  payload: null,
  type: CREATE_CAMPAIGNS_FAILED,
});

export const CreateCampaigns = (campaign: ICreateCampaignPayload, auth: IAuthPayload, userId?: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(CreateCampaignsStart(campaign));
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/campaign`, campaign, {
        headers: {
          "-x-user": userId,
          "Authorization": `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(OpenSnackBar("Campaign created Successfully"));
      dispatch(CreateCampaignsSuccessful(response.data));
      return Promise.resolve(response.data);
      // TODO: Remove w/ redux
    } catch (error: any) {
      dispatch(CreateCampaignsFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Create Campaigns  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Create Campaigns  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Create Campaigns  Failed: ${error.message}`));
      }
      return Promise.reject(error);
    }
  };
};
