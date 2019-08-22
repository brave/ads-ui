import {
    GET_CAMPAIGN_LIST_FAILED,
    GET_CAMPAIGN_LIST_START,
    GET_CAMPAIGN_LIST_SUCCESSFUL,
    ICampaignListAction,
    SIGN_OUT,
} from "../../actions";

import { getCampaignListReducer } from "./campaignList.get";
import { ICampaignListState } from "./campaignList.interface";

const campaignListReducer = (
    state: ICampaignListState = {
        campaignList: [],
    },
    action: ICampaignListAction,
) => {
    switch (action.type) {
        case GET_CAMPAIGN_LIST_START:
        case GET_CAMPAIGN_LIST_FAILED:
        case GET_CAMPAIGN_LIST_SUCCESSFUL:
            return getCampaignListReducer(state, action);
        case SIGN_OUT:
            return {
                campaignList: [],
            };
        default:
            return state;
    }
};

export default campaignListReducer;
