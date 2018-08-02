import { SIGN_IN_FAILED, SIGN_IN_START, SIGN_IN_SUCCESSFUL, SIGN_OUT } from "../../actions";
import { SIGN_UP_FAILED, SIGN_UP_START, SIGN_UP_SUCCESSFUL } from "../../actions";
import { IAuthAction } from "../../actions";

import { IAuthState } from "./auth.interface";
import { signInReducer } from "./auth.signin";
import { signUpReducer } from "./auth.signup";

const authReducer = (
  state: IAuthState = {
    accessToken: "",
    email: "",
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
    default:
      return state;
  }
};

export default authReducer;
