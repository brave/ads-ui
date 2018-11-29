import {
  GET_CONFIRMATIONTYPES_FAILD,
  GET_CONFIRMATIONTYPES_START,
  GET_CONFIRMATIONTYPES_SUCCESSFUL,
  IConfirmationTypeAction,
  IConfirmationTypePayload,
} from "../../actions";
import { IConfirmationTypeState } from "./confirmationType.interface";

export const getConfirmationTypeReducer = (state: IConfirmationTypeState, action: IConfirmationTypeAction): IConfirmationTypeState => {
  switch (action.type) {
    case GET_CONFIRMATIONTYPES_START:
      return {
        ...state,
      };
    case GET_CONFIRMATIONTYPES_SUCCESSFUL:
      return {
        confirmationTypes: action.payload as IConfirmationTypePayload[],
      };
    case GET_CONFIRMATIONTYPES_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
