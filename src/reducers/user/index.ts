import { SIGN_IN_FAILED, SIGN_IN_START, SIGN_IN_SUCCESSFUL, SIGN_OUT } from "../../actions";
import { SIGN_UP_FAILED, SIGN_UP_START, SIGN_UP_SUCCESSFUL } from "../../actions";
import { IUserAction } from "../../actions";

import { IUserState } from "./user.interface";
import { signInReducer } from "./user.signin";
import { signUpReducer } from "./user.signup";

const userReducer = (
  state: IUserState = {
    accessToken: "",
    email: "",
    error: false,
    processing: false,
    signedIn: false,
    success: false,
  },
  action: IUserAction,
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

export default userReducer;
