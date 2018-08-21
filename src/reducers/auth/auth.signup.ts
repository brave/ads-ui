import {
  IAuthAction,
  ISignUpPayload,
  ISignUpSuccessfulPayload,
  SIGN_UP_FAILED,
  SIGN_UP_START,
  SIGN_UP_SUCCESSFUL,
} from "../../actions";

import { IAuthState } from "./auth.interface";

export const signUpReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case SIGN_UP_START:
      return {
        accessToken: "",
        email: (action.payload as ISignUpPayload).email,
        emailVerified: false,
        id: "",
        role: "",
        signedIn: false,
      };
    case SIGN_UP_SUCCESSFUL:
      return {
        accessToken: "",
        email: (action.payload as ISignUpSuccessfulPayload).email,
        emailVerified: false,
        id: "",
        role: "",
        signedIn: false,
      };
    case SIGN_UP_FAILED:
      return {
        accessToken: "",
        email: "",
        emailVerified: false,
        id: "",
        role: "",
        signedIn: false,
      };
    default:
      return state;
  }
};
