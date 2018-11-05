import * as _ from "lodash";

import {
  IInvoiceAction,
  IInvoicePayload,
  UPDATE_INVOICES_FAILED,
  UPDATE_INVOICES_START,
  UPDATE_INVOICES_SUCCESSFUL,
} from "../../actions";
import { IInvoiceState } from "./invoice.interface";

export const updateCreativeReducer = (state: IInvoiceState, action: IInvoiceAction): IInvoiceState => {
  switch (action.type) {
    case UPDATE_INVOICES_START:
      return {
        ...state,
      };
    case UPDATE_INVOICES_SUCCESSFUL:
      const invoices = _.filter(state.invoices, (item, index) => {
        return item.id !== (action.payload as IInvoicePayload).id;
      });
      invoices.unshift(action.payload as IInvoicePayload);
      return {
        invoices,
      };
    case UPDATE_INVOICES_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
