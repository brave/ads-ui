import * as _ from "lodash";

import {
  IAuthAction,
  USER_VERIFY_FAILED,
  USER_VERIFY_START,
  USER_VERIFY_SUCCESSFUL,
} from "../../actions";

import { IAuthState } from "./auth.interface";

export const verifyReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case USER_VERIFY_START:
      return state;
    case USER_VERIFY_SUCCESSFUL:
      const newState = _.clone(state);
      newState.emailVerified = true;
      return newState;
    case USER_VERIFY_FAILED:
      return state;
    default:
      return state;
  }
};
