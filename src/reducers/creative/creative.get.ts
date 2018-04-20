import {
  GET_CREATIVES_FAILED,
  GET_CREATIVES_START,
  GET_CREATIVES_SUCCESSFUL,
  ICreativeAction,
  ICreativePayload,
} from "../../actions";
import { ICreativeState } from "./creative.interface";

export const getCreativeReducer = (state: ICreativeState, action: ICreativeAction): ICreativeState => {
  switch (action.type) {
    case GET_CREATIVES_START:
      return {
        ...state,
      };
    case GET_CREATIVES_SUCCESSFUL:
      return {
        creatives: action.payload as ICreativePayload[],
      };
    case GET_CREATIVES_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
