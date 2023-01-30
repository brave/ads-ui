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

export const UpdateCampaigns = (campaign: Partial<ICampaignPayload>, auth: IAuthPayload, userId?: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(UpdateCampaignsStart(campaign));
      const response = await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/campaign/${campaign.id}`, campaign, {
        headers: {
          "-x-user": userId,
          "Authorization": `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(UpdateCampaignsSuccessful(response.data));
      dispatch(OpenSnackBar("Campaign updated Successfully"));
      return Promise.resolve(response.data);
      // TODO: Remove w/ redux
    } catch (error: any) {
      dispatch(UpdateCampaignsFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Update Campaigns  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Update Campaigns  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Update Campaigns  Failed: ${error.message}`));
      }
      return Promise.reject(error);
    }
  };
};
