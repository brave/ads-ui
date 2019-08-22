import {
  GET_CAMPAIGNS_FAILD,
  GET_CAMPAIGNS_START,
  GET_CAMPAIGNS_SUCCESSFUL,
  ICampaignAction,
  ICampaignPayload,
} from "../../actions";
import { ICampaignState } from "./campaign.interface";

export const getCampaignReducer = (state: ICampaignState, action: ICampaignAction): ICampaignState => {
  switch (action.type) {
    case GET_CAMPAIGNS_START:
      return {
        ...state,
      };
    case GET_CAMPAIGNS_SUCCESSFUL:
      return {
        campaigns: action.payload as ICampaignPayload[],
      };
    case GET_CAMPAIGNS_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};

