import {
  CREATE_CAMPAIGNS_FAILED,
  CREATE_CAMPAIGNS_START,
  CREATE_CAMPAIGNS_SUCCESSFUL,
  ICampaignAction,
  SIGN_OUT,
} from "../../actions";

import { createCampaignReducer } from "./campaign.create";
import { ICampaignState } from "./campaign.interface";

const campaignReducer = (
  state: ICampaignState = {
    campaigns: [],
  },
  action: ICampaignAction,
) => {
  switch (action.type) {
    case CREATE_CAMPAIGNS_FAILED:
    case CREATE_CAMPAIGNS_START:
    case CREATE_CAMPAIGNS_SUCCESSFUL:
      return createCampaignReducer(state, action);
    case SIGN_OUT:
      return {
        campaigns: [],
      };
    default:
      return state;
  }
};

export default campaignReducer;
