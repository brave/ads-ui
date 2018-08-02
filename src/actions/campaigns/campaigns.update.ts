import axios from "axios";

import { ICampaignAction, ICampaignPayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const UPDATE_CAMPAIGNS_START = "UPDATECAMPAIGNSSTART";
export const UpdateCampaignsStart = (payload: Partial<ICampaignPayload>): ICampaignAction => ({
  payload,
  type: UPDATE_CAMPAIGNS_START,
});

export const UPDATE_CAMPAIGNS_SUCCESSFUL = "UPDATECAMPAIGNSSUCCESSFUL";
export const UpdateCampaignsSuccessful = (payload: ICampaignPayload): ICampaignAction => ({
  payload,
  type: UPDATE_CAMPAIGNS_SUCCESSFUL,
});

export const UPDATE_CAMPAIGNS_FAILED = "UPDATECAMPAIGNFAILED";
export const UpdateCampaignsFailed = (): ICampaignAction => ({
  payload: null,
  type: UPDATE_CAMPAIGNS_FAILED,
});

export const UpdateCampaigns = (campaign: Partial<ICampaignPayload>, user: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(UpdateCampaignsStart(campaign));
      const response = await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/campaign/${campaign.id}`, campaign, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(UpdateCampaignsSuccessful(response.data));
      dispatch(OpenSnackBar("Campaign updated Successfully"));
    } catch (error) {
      dispatch(UpdateCampaignsFailed());
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
