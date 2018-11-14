import _ from "lodash";

import {
  ICreativeAction,
  ICreativePayload,
  UPDATE_CREATIVES_FAILED,
  UPDATE_CREATIVES_START,
  UPDATE_CREATIVES_SUCCESSFUL,
} from "../../actions";
import { ICreativeState } from "./creative.interface";

export const updateCreativeReducer = (state: ICreativeState, action: ICreativeAction): ICreativeState => {
  switch (action.type) {
    case UPDATE_CREATIVES_START:
      return {
        ...state,
      };
    case UPDATE_CREATIVES_SUCCESSFUL:
      const creatives = _.filter(state.creatives, (item, index) => {
        return item.id !== (action.payload as ICreativePayload).id;
      });
      creatives.unshift(action.payload as ICreativePayload);
      return {
        creatives,
      };
    case UPDATE_CREATIVES_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
