import {
  GET_ADVERTISERS_FAILD,
  GET_ADVERTISERS_START,
  GET_ADVERTISERS_SUCCESSFUL,
  IAdvertiserAction,
  IAdvertiserPayload,
} from "../../actions";
import { IAdvertiserState } from "./advertiser.interface";

export const getAdvertiserReducer = (state: IAdvertiserState, action: IAdvertiserAction): IAdvertiserState => {
  switch (action.type) {
    case GET_ADVERTISERS_START:
      return {
        ...state,
      };
    case GET_ADVERTISERS_SUCCESSFUL:
      return {
        advertisers: action.payload as IAdvertiserPayload[],
      };
    case GET_ADVERTISERS_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
