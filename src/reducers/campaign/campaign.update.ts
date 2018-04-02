import * as _ from "lodash";

import { UPDATE_CAMPAIGNS_FAILED, UPDATE_CAMPAIGNS_START, UPDATE_CAMPAIGNS_SUCCESSFUL } from "../../actions";

export const updateCampaignReducer = (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_CAMPAIGNS_START:
      return {
        ...state,
      };
    case UPDATE_CAMPAIGNS_SUCCESSFUL:
      const campaigns = _.filter(state.campaigns, (item, index) => {
        return item.id !== action.payload.id;
      });
      campaigns.unshift(action.payload);
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
