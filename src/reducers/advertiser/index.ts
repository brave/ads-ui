import {
  CREATE_ADVERTISERS_FAILED,
  CREATE_ADVERTISERS_START,
  CREATE_ADVERTISERS_SUCCESSFUL,
  GET_ADVERTISERS_FAILD,
  GET_ADVERTISERS_START,
  GET_ADVERTISERS_SUCCESSFUL,
  IAdvertiserAction,
} from "../../actions";

import { IAdvertiserState } from "./advertiser.interface";

import { createAdvertiserReducer } from "./advertiser.create";
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
    case CREATE_ADVERTISERS_FAILED:
    case CREATE_ADVERTISERS_START:
    case CREATE_ADVERTISERS_SUCCESSFUL:
      return createAdvertiserReducer(state, action);
    default:
      return state;
  }
};
export default advertiserReducer;
