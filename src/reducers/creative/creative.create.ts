import {
  CREATE_CREATIVES_FAILED,
  CREATE_CREATIVES_START,
  CREATE_CREATIVES_SUCCESSFUL,
  ICreativeAction,
  ICreativePayload,
} from "../../actions";
import { ICreativeState } from "./creative.interface";

export const createCreativeReducer = (state: ICreativeState, action: ICreativeAction): ICreativeState => {
  switch (action.type) {
    case CREATE_CREATIVES_START:
      return {
        ...state,
      };
    case CREATE_CREATIVES_SUCCESSFUL:
      return {
        creatives: [
          action.payload as ICreativePayload,
          ...state.creatives,
        ],
      };
    case CREATE_CREATIVES_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
