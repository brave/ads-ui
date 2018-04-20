import * as _ from "lodash";

import {
  ICampaignAction,
  ICampaignPayload,
  UPDATE_CAMPAIGNS_FAILED,
  UPDATE_CAMPAIGNS_START,
  UPDATE_CAMPAIGNS_SUCCESSFUL,
} from "../../actions";
import { ICampaignState } from "./campaign.interface";

export const updateCampaignReducer = (state: ICampaignState, action: ICampaignAction): ICampaignState => {
  switch (action.type) {
    case UPDATE_CAMPAIGNS_START:
      return {
        ...state,
      };
    case UPDATE_CAMPAIGNS_SUCCESSFUL:
      const campaigns = _.filter(state.campaigns, (item, index) => {
        return item.id !== (action.payload as ICampaignPayload).id;
      });
      campaigns.unshift(action.payload as ICampaignPayload);
      return {
        campaigns,
      };
    case UPDATE_CAMPAIGNS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
