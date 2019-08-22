import {
    GET_CAMPAIGN_LIST_FAILED,
    GET_CAMPAIGN_LIST_START,
    GET_CAMPAIGN_LIST_SUCCESSFUL,
    ICampaignListAction,
    ICampaignListPayload,
} from "../../actions";
import { ICampaignListState } from "./campaignList.interface";

export const getCampaignListReducer = (state: ICampaignListState, action: ICampaignListAction): ICampaignListState => {
    switch (action.type) {
        case GET_CAMPAIGN_LIST_START:
            return {
                ...state,
            };
        case GET_CAMPAIGN_LIST_SUCCESSFUL:
            return {
                campaignList: action.payload as ICampaignListPayload[],
            };
        case GET_CAMPAIGN_LIST_FAILED:
            return {
                ...state,
            };
        default:
            return state;
    }
};

