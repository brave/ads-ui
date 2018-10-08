import {
  GET_CAMPAIGNS_FAILD,
  GET_CAMPAIGNS_START,
  GET_CAMPAIGNS_SUCCESSFUL,
  ICreativeSetAction,
  ICreativeSetPayload,
} from "../../actions";
import { ICreativeSetState } from "./creativeset.interface";

export const getCreativeSetReducer = (state: ICreativeSetState, action: ICreativeSetAction): ICreativeSetState => {
  switch (action.type) {
    case GET_CAMPAIGNS_START:
      return {
        ...state,
      };
    case GET_CAMPAIGNS_SUCCESSFUL:
      return {
        creativesets: action.payload as ICreativeSetPayload[],
      };
    case GET_CAMPAIGNS_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
