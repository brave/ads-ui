import axios from "axios";

import { IInvoiceAction, IInvoicePayload } from ".";
import { OpenSnackBar } from "../snackbar";

export const GET_INVOICES_START = "GETINVOICESSTART";
export const GetInvoicesStart = (): IInvoiceAction => ({
  payload: null,
  type: GET_INVOICES_START,
});

export const GET_INVOICES_SUCCESSFUL = "GETINVOICESSUCCESSFUL";
export const GetInvoicesSuccessful = (payload: IInvoicePayload[]): IInvoiceAction => ({
  payload,
  type: GET_INVOICES_SUCCESSFUL,
});

export const GET_INVOICES_FAILED = "GETINVOICEFAILED";
export const GetInvoicesFailed = (): IInvoiceAction => ({
  payload: null,
  type: GET_INVOICES_FAILED,
});

export const GetInvoices = (user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetInvoicesStart());
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/invoice`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetInvoicesSuccessful(response.data));
      dispatch(OpenSnackBar("Invoice get Successfully"));
    } catch (error) {
      dispatch(GetInvoicesFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Get Invoices Faild: ${error.response.data.error}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Invoices Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Invoices Faild: ${error.message}`));
      }
    }
  };
};
