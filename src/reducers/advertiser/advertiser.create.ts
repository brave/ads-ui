import {
  CREATE_ADVERTISERS_FAILED,
  CREATE_ADVERTISERS_START,
  CREATE_ADVERTISERS_SUCCESSFUL,
  IAdvertiserAction,
  IAdvertiserPayload,
} from "../../actions";
import { IAdvertiserState } from "./advertiser.interface";

export const createAdvertiserReducer = (state: IAdvertiserState, action: IAdvertiserAction): IAdvertiserState => {
  switch (action.type) {
    case CREATE_ADVERTISERS_START:
      return {
        ...state,
      };
    case CREATE_ADVERTISERS_SUCCESSFUL:
      return {
        advertisers: [
          action.payload as IAdvertiserPayload,
          ...state.advertisers,
        ],
      };
    case CREATE_ADVERTISERS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
