import axios from "axios";

import { OpenSnackBar } from "../snackbar";

export const GET_CAMPAIGNS_START = "GETCAMPAIGNSSTART";
export const GetCampaignsStart = (payload: any) => ({
  payload,
  type: GET_CAMPAIGNS_START,
});

export const GET_CAMPAIGNS_SUCCESSFUL = "GETCAMPAIGNSUCCESSFUL";
export const GetCampaignSuccessful = (payload: any) => ({
  payload,
  type: GET_CAMPAIGNS_SUCCESSFUL,
});

export const GET_CAMPAIGNS_FAILD = "GETCAMPAIGNSFAILD";
export const GetCampaignsFaild = (payload: any) => ({
  payload,
  type: GET_CAMPAIGNS_FAILD,
});

export const GetCampaigns = (user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetCampaignsStart);
      const response = await axios.get(`http://localhost:4000/campaign`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetCampaignSuccessful(response.data));
      dispatch(OpenSnackBar("Campaign Get Successfully"));
    } catch (error) {
      dispatch(GetCampaignsFaild(error));
      if (error.response) {
        dispatch(OpenSnackBar(`Get Campaigns Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Campaigns Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Campaigns Faild: ${error.message}`));
      }
    }
  };
};
