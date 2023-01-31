import {
  GET_ADVERTISERS_FAILD,
  GET_ADVERTISERS_START,
  GET_ADVERTISERS_SUCCESSFUL,
  IAdvertiserAction,
  SIGN_OUT,
} from "../../actions";

import { IAdvertiserState } from "./advertiser.interface";
import { getAdvertiserReducer } from "./advertiser.get";

const advertiserReducer = (
  state: IAdvertiserState = {
    advertisers: [],
  },
  action: IAdvertiserAction,
) => {
  switch (action.type) {
    case GET_ADVERTISERS_FAILD:
    case GET_ADVERTISERS_SUCCESSFUL:
    case GET_ADVERTISERS_START:
      return getAdvertiserReducer(state, action);
    case SIGN_OUT:
      return {
        advertisers: [],
      };
    default:
      return state;
  }
};
export default advertiserReducer;
