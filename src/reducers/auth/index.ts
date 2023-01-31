import {
  SIGN_IN_FAILED,
  SIGN_IN_START,
  SIGN_IN_SUCCESSFUL,
  SIGN_OUT,
} from "../../actions";
import { IAuthAction } from "../../actions";

import { IAuthState } from "./auth.interface";
import { signInReducer } from "./auth.signin";

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
    default:
      return state;
  }
};

export default authReducer;
