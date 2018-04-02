import { CREATE_CAMPAIGNS_FAILED, CREATE_CAMPAIGNS_START, CREATE_CAMPAIGNS_SUCCESSFUL } from "../../actions";

export const createCampaignReducer = (state: any, action: any) => {
  switch (action.type) {
    case CREATE_CAMPAIGNS_START:
      return {
        ...state,
      };
    case CREATE_CAMPAIGNS_SUCCESSFUL:
      return {
        campaigns: [
          action.payload,
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
