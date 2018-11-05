import {
  GET_INVOICES_FAILED,
  GET_INVOICES_START,
  GET_INVOICES_SUCCESSFUL,
  IInvoiceAction,
  UPDATE_INVOICES_FAILED,
  UPDATE_INVOICES_START,
  UPDATE_INVOICES_SUCCESSFUL,
} from "../../actions";

import { getInvoiceReducer } from "./invoice.get";
import { IInvoiceState } from "./invoice.interface";
import { updateCreativeReducer } from "./invoice.update";

const creativeReducer = (
  state: IInvoiceState = {
    invoices: [],
  },
  action: IInvoiceAction,
) => {
  switch (action.type) {
    case GET_INVOICES_START:
    case GET_INVOICES_SUCCESSFUL:
    case GET_INVOICES_FAILED:
      return getInvoiceReducer(state, action);
    case UPDATE_INVOICES_FAILED:
    case UPDATE_INVOICES_START:
    case UPDATE_INVOICES_SUCCESSFUL:
      return updateCreativeReducer(state, action);
    default:
      return state;
  }
};

export default creativeReducer;
