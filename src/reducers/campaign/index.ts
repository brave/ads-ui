import { GET_CAMPAIGNS_FAILD, GET_CAMPAIGNS_START, GET_CAMPAIGNS_SUCCESSFUL } from "../../actions";

import { getCampaignReducer } from "./campaign.get";

const campaignReducer = (
  state = {
    campaigns: [],
  },
  action: any,
) => {
  switch (action.type) {
    case GET_CAMPAIGNS_START:
    case GET_CAMPAIGNS_FAILD:
    case GET_CAMPAIGNS_SUCCESSFUL:
      return getCampaignReducer(state, action);
    default:
      return state;
  }
};

export default campaignReducer;
