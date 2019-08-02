import axios from "axios";

import { IReportPayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const GET_REPORTS_START = "GETREPORTSSTART";
export const GetReportsStart = () => ({
  payload: null,
  type: GET_REPORTS_START,
});

export const GET_REPORTS_SUCCESSFUL = "GETREPORTSUCCESSFUL";
export const GetReportSuccessful = (payload: IReportPayload) => ({
  payload,
  type: GET_REPORTS_SUCCESSFUL,
});

export const GET_REPORTS_FAILD = "GETREPORTSFAILD";
export const GetReportsFaild = () => ({
  payload: null,
  type: GET_REPORTS_FAILD,
});

export const GetReports = (user: IAuthPayload, campaignId: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetReportsStart());
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/report/campaign/summary/${campaignId}`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetReportSuccessful(response.data));
      dispatch(OpenSnackBar("Report Get Successfully"));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(GetReportsFaild());
      if (error.response) {
        dispatch(OpenSnackBar(`Get Reports  Failed: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Reports  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Reports  Failed: ${error.message}`));
      }
    }
  };
};
