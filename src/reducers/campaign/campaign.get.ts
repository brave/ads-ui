import { GET_CAMPAIGNS_FAILD, GET_CAMPAIGNS_START, GET_CAMPAIGNS_SUCCESSFUL } from "../../actions";

export const getCampaignReducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_CAMPAIGNS_START:
      return {
        ...state,
      };
    case GET_CAMPAIGNS_SUCCESSFUL:
      return {
        creatives: action.payload,
      };
    case GET_CAMPAIGNS_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
