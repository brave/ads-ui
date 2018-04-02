import axios from "axios";

import { OpenSnackBar } from "../snackbar";

export const CREATE_CAMPAIGNS_START = "CREATECAMPAIGNSSTART";
export const CreateCampaignsStart = (payload: any) => ({
  payload,
  type: CREATE_CAMPAIGNS_START,
});

export const CREATE_CAMPAIGNS_SUCCESSFUL = "CREATECAMPAIGNSSUCCESSFUL";
export const CreateCampaignsSuccessful = (payload: any) => ({
  payload,
  type: CREATE_CAMPAIGNS_SUCCESSFUL,
});

export const CREATE_CAMPAIGNS_FAILED = "CREATECAMPAIGNFAILED";
export const CreateCampaignsFailed = (payload: any) => ({
  payload,
  type: CREATE_CAMPAIGNS_FAILED,
});

export const CreateCampaigns = (campaign: any, user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(CreateCampaignsStart(campaign));
      const response = await axios.post(`http://localhost:4000/campaign`, campaign, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(OpenSnackBar("Campaign created Successfully"));
      dispatch(CreateCampaignsSuccessful(response.data));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(CreateCampaignsFailed(error));
      if (error.response) {
        dispatch(OpenSnackBar(`Create Campaigns Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Create Campaigns Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Create Campaigns Faild: ${error.message}`));
      }
    }
  };
};
