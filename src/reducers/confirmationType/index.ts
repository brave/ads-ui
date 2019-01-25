import {
  GET_CONFIRMATIONTYPES_FAILD,
  GET_CONFIRMATIONTYPES_START,
  GET_CONFIRMATIONTYPES_SUCCESSFUL,
  IConfirmationTypeAction,
} from "../../actions";

import { getConfirmationTypeReducer } from "./confirmationType.get";
import { IConfirmationTypeState } from "./confirmationType.interface";

const ConfirmationTypeReducer = (
  state: IConfirmationTypeState = {
    confirmationTypes: [],
  },
  action: IConfirmationTypeAction,
) => {
  switch (action.type) {
    case GET_CONFIRMATIONTYPES_START:
    case GET_CONFIRMATIONTYPES_FAILD:
    case GET_CONFIRMATIONTYPES_SUCCESSFUL:
      return getConfirmationTypeReducer(state, action);
    default:
      return state;
  }
};

export default ConfirmationTypeReducer;
