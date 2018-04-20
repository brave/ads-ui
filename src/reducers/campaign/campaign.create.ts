import {
  CREATE_CAMPAIGNS_FAILED,
  CREATE_CAMPAIGNS_START,
  CREATE_CAMPAIGNS_SUCCESSFUL,
  ICampaignAction,
  ICampaignPayload,
} from "../../actions";
import { ICampaignState } from "./campaign.interface";

export const createCampaignReducer = (state: ICampaignState, action: ICampaignAction): ICampaignState => {
  switch (action.type) {
    case CREATE_CAMPAIGNS_START:
      return {
        ...state,
      };
    case CREATE_CAMPAIGNS_SUCCESSFUL:
      return {
        campaigns: [
          action.payload as ICampaignPayload,
          ...state.campaigns,
        ],
      };
    case CREATE_CAMPAIGNS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
