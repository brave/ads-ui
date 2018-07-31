import {
  ISignUpPayload,
  ISignUpSuccessfulPayload,
  IUserAction,
  SIGN_UP_FAILED,
  SIGN_UP_START,
  SIGN_UP_SUCCESSFUL,
} from "../../actions";

import { IUserState } from "./user.interface";

export const signUpReducer = (state: IUserState, action: IUserAction): IUserState => {
  switch (action.type) {
    case SIGN_UP_START:
      return {
        accessToken: "",
        email: (action.payload as ISignUpPayload).email,
        id: "",
        role: "",
        signedIn: false,
      };
    case SIGN_UP_SUCCESSFUL:
      return {
        accessToken: "",
        email: (action.payload as ISignUpSuccessfulPayload).email,
        id: "",
        role: "",
        signedIn: false,
      };
    case SIGN_UP_FAILED:
      return {
        accessToken: "",
        email: "",
        id: "",
        role: "",
        signedIn: false,
      };
    default:
      return state;
  }
};
