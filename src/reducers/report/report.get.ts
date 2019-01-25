import _ from "lodash";

import {
  GET_REPORTS_FAILD,
  GET_REPORTS_START,
  GET_REPORTS_SUCCESSFUL,
  IReportAction,
  IReportPayload,
} from "../../actions";
import { IReportState } from "./report.interface";

export const getReportReducer = (state: IReportState, action: IReportAction): IReportState => {
  switch (action.type) {
    case GET_REPORTS_START:
      return {
        ...state,
      };
    case GET_REPORTS_SUCCESSFUL:
      const reports = _.filter(state.reports, {
        campaignId: (action.payload as IReportPayload).campaignId,
      });
      reports.unshift(action.payload as IReportPayload);
      return {
        reports,
      };
    case GET_REPORTS_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
