import axios from "axios";

import { ICampaignAction, ICampaignPayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const GET_CAMPAIGNS_START = "GETCAMPAIGNSSTART";
export const GetCampaignsStart = (): ICampaignAction => ({
  payload: null,
  type: GET_CAMPAIGNS_START,
});

export const GET_CAMPAIGNS_SUCCESSFUL = "GETCAMPAIGNSUCCESSFUL";
export const GetCampaignSuccessful = (payload: ICampaignPayload[]): ICampaignAction => ({
  payload,
  type: GET_CAMPAIGNS_SUCCESSFUL,
});

export const GET_CAMPAIGNS_FAILD = "GETCAMPAIGNSFAILD";
export const GetCampaignsFaild = (): ICampaignAction => ({
  payload: null,
  type: GET_CAMPAIGNS_FAILD,
});

export const GetCampaigns = (user: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetCampaignsStart);
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/campaign`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetCampaignSuccessful(response.data));
      dispatch(OpenSnackBar("Campaign Get Successfully"));
    } catch (error) {
      dispatch(GetCampaignsFaild());
      if (error.response) {
        dispatch(OpenSnackBar(`Get Campaigns Faild: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Campaigns Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Campaigns Faild: ${error.message}`));
      }
    }
  };
};
