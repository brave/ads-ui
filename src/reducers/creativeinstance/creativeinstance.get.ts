import {
  GET_CREATIVEINSTANCES_FAILD,
  GET_CREATIVEINSTANCES_START,
  GET_CREATIVEINSTANCES_SUCCESSFUL,
  ICreativeInstanceAction,
  ICreativeInstancePayload,
} from "../../actions";
import { ICreativeInstanceState } from "./creativeinstance.interface";

export const getCreativeInstanceReducer = (state: ICreativeInstanceState, action: ICreativeInstanceAction):
  ICreativeInstanceState => {
  switch (action.type) {
    case GET_CREATIVEINSTANCES_START:
      return {
        ...state,
      };
    case GET_CREATIVEINSTANCES_SUCCESSFUL:
      return {
        creativeInstances: action.payload as ICreativeInstancePayload[],
      };
    case GET_CREATIVEINSTANCES_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
