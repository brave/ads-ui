import axios from "axios";

import { OpenSnackBar } from "../snackbar";

export const UPDATE_CAMPAIGNS_START = "UPDATECAMPAIGNSSTART";
export const UpdateCampaignsStart = (payload: any) => ({
  payload,
  type: UPDATE_CAMPAIGNS_START,
});

export const UPDATE_CAMPAIGNS_SUCCESSFUL = "UPDATECAMPAIGNSSUCCESSFUL";
export const UpdateCampaignsSuccessful = (payload: any) => ({
  payload,
  type: UPDATE_CAMPAIGNS_SUCCESSFUL,
});

export const UPDATE_CAMPAIGNS_FAILED = "UPDATECAMPAIGNFAILED";
export const UpdateCampaignsFailed = (payload: any) => ({
  payload,
  type: UPDATE_CAMPAIGNS_FAILED,
});

export const UpdateCampaigns = (campaign: any, user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(UpdateCampaignsStart(user));
      const response = await axios.put(`http://localhost:4000/campaign/${campaign.id}`, campaign, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(UpdateCampaignsSuccessful(response.data));
      dispatch(OpenSnackBar("Campaign updated Successfully"));
    } catch (error) {
      dispatch(UpdateCampaignsFailed(error));
      if (error.response) {
        dispatch(OpenSnackBar(`Update Campaigns Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Update Campaigns Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Update Campaigns Faild: ${error.message}`));
      }
    }
  };
};
