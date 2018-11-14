import _ from "lodash";

import {
  DELETE_CREATIVEINSTANCES_FAILED,
  DELETE_CREATIVEINSTANCES_START,
  DELETE_CREATIVEINSTANCES_SUCCESSFUL,
  ICreativeInstanceAction,
  ICreativeInstancePayload,
} from "../../actions";
import { ICreativeInstanceState } from "./creativeinstance.interface";

export const deleteCreativeInstanceReducer = (state: ICreativeInstanceState, action: ICreativeInstanceAction):
  ICreativeInstanceState => {
  switch (action.type) {
    case DELETE_CREATIVEINSTANCES_START:
      return {
        ...state,
      };
    case DELETE_CREATIVEINSTANCES_SUCCESSFUL:
      const creativeInstances = _.filter(state.creativeInstances, (item) => {
        return item.id !== (action.payload as ICreativeInstancePayload).id;
      });
      return {
        creativeInstances,
      };
    case DELETE_CREATIVEINSTANCES_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
