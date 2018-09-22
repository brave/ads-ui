import {
  GET_CREATIVES_SUCCESSFUL,
  GET_CREATIVETYPES_FAILD,
  GET_CREATIVETYPES_START,
  ICreativeTypeAction,
  ICreativeTypePayload,
} from "../../actions";
import { ICreativeTypeState } from "./creativetype.interface";

export const getCreativeTypeReducer = (state: ICreativeTypeState, action: ICreativeTypeAction): ICreativeTypeState => {
  switch (action.type) {
    case GET_CREATIVETYPES_START:
      return {
        ...state,
      };
    case GET_CREATIVES_SUCCESSFUL:
      return {
        creativetypes: action.payload as ICreativeTypePayload[],
      };
    case GET_CREATIVETYPES_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
