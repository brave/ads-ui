import axios from "axios";

import { IInvoiceAction, IInvoicePayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const UPDATE_INVOICES_START = "UPDATEINVOICESSTART";
export const UpdateInvoicesStart = (payload: Partial<IInvoicePayload>): IInvoiceAction => ({
  payload,
  type: UPDATE_INVOICES_START,
});

export const UPDATE_INVOICES_SUCCESSFUL = "UPDATEINVOICESSUCCESSFUL";
export const UpdateInvoicesSuccessful = (payload: IInvoicePayload): IInvoiceAction => ({
  payload,
  type: UPDATE_INVOICES_SUCCESSFUL,
});

export const UPDATE_INVOICES_FAILED = "UPDATEINVOICEFAILED";
export const UpdateInvoicesFailed = (): IInvoiceAction => ({
  payload: null,
  type: UPDATE_INVOICES_FAILED,
});

export const UpdateInvoices = (invoice: Partial<IInvoicePayload>, user: IAuthPayload, userId?: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(UpdateInvoicesStart(invoice));
      const response = await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/invoice/${invoice.id}`, invoice, {
        headers: {
          "-x-user": userId,
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(UpdateInvoicesSuccessful(response.data));
      dispatch(OpenSnackBar("Invoice updated Successfully"));
    } catch (error: any) {
      dispatch(UpdateInvoicesFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Update Invoices  Failed: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Update Invoices  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Update Invoices  Failed: ${error.message}`));
      }
    }
  };
};
