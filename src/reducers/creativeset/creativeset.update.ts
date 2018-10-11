import * as _ from "lodash";

import {
  ICreativeSetAction,
  ICreativeSetPayload,
  UPDATE_CREATIVESETS_FAILED,
  UPDATE_CREATIVESETS_START,
  UPDATE_CREATIVESETS_SUCCESSFUL,
} from "../../actions";
import { ICreativeSetState } from "./creativeset.interface";

export const updateCreativeSetReducer = (state: ICreativeSetState, action: ICreativeSetAction): ICreativeSetState => {
  switch (action.type) {
    case UPDATE_CREATIVESETS_START:
      return {
        ...state,
      };
    case UPDATE_CREATIVESETS_SUCCESSFUL:
      const creativesets = _.filter(state.creativesets, (item) => {
        return item.id !== (action.payload as ICreativeSetPayload).id;
      });
      creativesets.unshift(action.payload as ICreativeSetPayload);
      return {
        creativesets,
      };
    case UPDATE_CREATIVESETS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
