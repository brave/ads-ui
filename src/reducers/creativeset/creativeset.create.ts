import {
  CREATE_CAMPAIGNS_FAILED,
  CREATE_CAMPAIGNS_START,
  CREATE_CAMPAIGNS_SUCCESSFUL,
  ICreativeSetAction,
  ICreativeSetPayload,
} from "../../actions";
import { ICreativeSetState } from "./creativeset.interface";

export const createCreativeSetReducer = (state: ICreativeSetState, action: ICreativeSetAction): ICreativeSetState => {
  switch (action.type) {
    case CREATE_CAMPAIGNS_START:
      return {
        ...state,
      };
    case CREATE_CAMPAIGNS_SUCCESSFUL:
      return {
        creativesets: [
          action.payload as ICreativeSetPayload,
          ...state.creativesets,
        ],
      };
    case CREATE_CAMPAIGNS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
