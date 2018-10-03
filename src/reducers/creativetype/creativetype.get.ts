import {
  GET_CREATIVETYPES_FAILD,
  GET_CREATIVETYPES_START,
  GET_CREATIVETYPES_SUCCESSFUL,
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
    case GET_CREATIVETYPES_SUCCESSFUL:
      return {
        creativeTypes: action.payload as ICreativeTypePayload[],
      };
    case GET_CREATIVETYPES_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
