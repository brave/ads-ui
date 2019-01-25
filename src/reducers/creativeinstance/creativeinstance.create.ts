import {
  CREATE_CREATIVEINSTANCES_FAILED,
  CREATE_CREATIVEINSTANCES_START,
  CREATE_CREATIVEINSTANCES_SUCCESSFUL,
  ICreativeInstanceAction,
  ICreativeInstancePayload,
} from "../../actions";
import { ICreativeInstanceState } from "./creativeinstance.interface";

export const createCreativeIstanceReducer = (state: ICreativeInstanceState, action: ICreativeInstanceAction):
  ICreativeInstanceState => {
  switch (action.type) {
    case CREATE_CREATIVEINSTANCES_START:
      return {
        ...state,
      };
    case CREATE_CREATIVEINSTANCES_SUCCESSFUL:
      return {
        creativeInstances: [
          action.payload as ICreativeInstancePayload,
          ...state.creativeInstances,
        ],
      };
    case CREATE_CREATIVEINSTANCES_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
