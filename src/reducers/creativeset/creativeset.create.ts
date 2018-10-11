import {
  CREATE_CREATIVESETS_FAILED,
  CREATE_CREATIVESETS_START,
  CREATE_CREATIVESETS_SUCCESSFUL,
  ICreativeSetAction,
  ICreativeSetPayload,
} from "../../actions";
import { ICreativeSetState } from "./creativeset.interface";

export const createCreativeSetReducer = (state: ICreativeSetState, action: ICreativeSetAction): ICreativeSetState => {
  switch (action.type) {
    case CREATE_CREATIVESETS_START:
      return {
        ...state,
      };
    case CREATE_CREATIVESETS_SUCCESSFUL:
      return {
        creativesets: [
          action.payload as ICreativeSetPayload,
          ...state.creativesets,
        ],
      };
    case CREATE_CREATIVESETS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
