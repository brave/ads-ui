import axios from "axios";

import { ICampaignListAction } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const GET_CAMPAIGN_LIST_START = "GETCAMPAIGNLISTSTART";
export const GetCampaignListStart = (): ICampaignListAction => ({
    payload: null,
    type: GET_CAMPAIGN_LIST_START,
});

export const GET_CAMPAIGN_LIST_SUCCESSFUL = "GETCAMPAIGNLISTSUCCESSFUL";
export const GetCampaignListSuccessful = (payload: any): ICampaignListAction => ({
    payload,
    type: GET_CAMPAIGN_LIST_SUCCESSFUL,
});

export const GET_CAMPAIGN_LIST_FAILED = "GETCAMPAIGNLISTFAILED";
export const GetCampaignListFailed = (): ICampaignListAction => ({
    payload: null,
    type: GET_CAMPAIGN_LIST_FAILED,
});

export const GetCampaignList = (auth: IAuthPayload, userId?: string) => {
    return async (dispatch: any) => {
        try {
            dispatch(GetCampaignListStart);
            const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/report/campaign/list`, {
                headers: {
                    "Authorization": `Bearer ${auth.accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            dispatch(GetCampaignListSuccessful(response.data));
            dispatch(OpenSnackBar("Campaign List retrieved successfully"));
            return Promise.resolve(response.data);
          // TODO: Remove w/ redux
        } catch (error: any) {
            dispatch(GetCampaignListFailed());
            if (error.response) {
                dispatch(OpenSnackBar(`Get Campaigns List  Failed: ${error.response.data.error}`));
            } else if (error.request) {
                dispatch(OpenSnackBar(`Get Campaigns List  Failed: Network Error`));
            } else {
                dispatch(OpenSnackBar(`Get Campaigns List  Failed: ${error.message}`));
            }
            return Promise.reject(error);
        }
    };
};
