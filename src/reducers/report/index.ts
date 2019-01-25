import {
  GET_REPORTS_FAILD,
  GET_REPORTS_START,
  GET_REPORTS_SUCCESSFUL,
  IReportAction,
  SIGN_OUT,
} from "../../actions";

import { getReportReducer } from "./report.get";
import { IReportState } from "./report.interface";

const reportReducer = (
  state: IReportState = {
    reports: [],
  },
  action: IReportAction,
) => {
  switch (action.type) {
    case GET_REPORTS_START:
    case GET_REPORTS_FAILD:
    case GET_REPORTS_SUCCESSFUL:
      return getReportReducer(state, action);
    case SIGN_OUT:
      return {
        reports: [],
      };
    default:
      return state;
  }
};

export default reportReducer;
