import {
  GET_INVOICES_FAILED,
  GET_INVOICES_START,
  GET_INVOICES_SUCCESSFUL,
  IInvoiceAction,
  IInvoicePayload,
} from "../../actions";
import { IInvoiceState } from "./invoice.interface";

export const getInvoiceReducer = (state: IInvoiceState, action: IInvoiceAction): IInvoiceState => {
  switch (action.type) {
    case GET_INVOICES_START:
      return {
        ...state,
      };
    case GET_INVOICES_SUCCESSFUL:
      return {
        invoices: action.payload as IInvoicePayload[],
      };
    case GET_INVOICES_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
