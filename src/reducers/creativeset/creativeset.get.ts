import {
  GET_CREATIVESETS_FAILD,
  GET_CREATIVESETS_START,
  GET_CREATIVESETS_SUCCESSFUL,
  ICreativeSetAction,
  ICreativeSetPayload,
} from "../../actions";
import { ICreativeSetState } from "./creativeset.interface";

export const getCreativeSetReducer = (state: ICreativeSetState, action: ICreativeSetAction): ICreativeSetState => {
  switch (action.type) {
    case GET_CREATIVESETS_START:
      return {
        ...state,
      };
    case GET_CREATIVESETS_SUCCESSFUL:
      return {
        creativesets: action.payload as ICreativeSetPayload[],
      };
    case GET_CREATIVESETS_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
