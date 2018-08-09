import {
  IAuthAction,
  USER_RESEND_FAILED,
  USER_RESEND_START,
  USER_RESEND_SUCCESSFUL,
} from "../../actions";

import { IAuthState } from "./auth.interface";

export const resendReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case USER_RESEND_START:
      return state;
    case USER_RESEND_SUCCESSFUL:
      return state;
    case USER_RESEND_FAILED:
      return state;
    default:
      return state;
  }
};
