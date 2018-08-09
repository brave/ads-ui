import {
  SIGN_IN_FAILED,
  SIGN_IN_START,
  SIGN_IN_SUCCESSFUL,
  SIGN_OUT,
  USER_RESEND_FAILED,
  USER_RESEND_START,
  USER_RESEND_SUCCESSFUL,
  USER_VERIFY_FAILED,
  USER_VERIFY_START,
  USER_VERIFY_SUCCESSFUL,
} from "../../actions";
import { SIGN_UP_FAILED, SIGN_UP_START, SIGN_UP_SUCCESSFUL } from "../../actions";
import { IAuthAction } from "../../actions";

import { IAuthState } from "./auth.interface";
import { resendReducer } from "./auth.resend";
import { signInReducer } from "./auth.signin";
import { signUpReducer } from "./auth.signup";
import { verifyReducer } from "./auth.verify";

const authReducer = (
  state: IAuthState = {
    accessToken: "",
    email: "",
    emailVerified: false,
    id: "",
    role: "",
    signedIn: false,
  },
  action: IAuthAction,
) => {
  switch (action.type) {
    case SIGN_IN_START:
    case SIGN_IN_SUCCESSFUL:
    case SIGN_IN_FAILED:
    case SIGN_OUT:
      return signInReducer(state, action);
    case SIGN_UP_START:
    case SIGN_UP_SUCCESSFUL:
    case SIGN_UP_FAILED:
      return signUpReducer(state, action);
    case USER_VERIFY_FAILED:
    case USER_VERIFY_SUCCESSFUL:
    case USER_VERIFY_START:
      return verifyReducer(state, action);
    case USER_RESEND_FAILED:
    case USER_RESEND_START:
    case USER_RESEND_SUCCESSFUL:
      return resendReducer(state, action);
    default:
      return state;
  }
};

export default authReducer;
