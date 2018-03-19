import { SIGN_IN_FAILED, SIGN_IN_START, SIGN_IN_SUCCESSFUL, SIGN_OUT } from "../../actions";

import { IUserState } from "./user.interface";

export const signInReducer = (state: IUserState, action: any): IUserState => {
  switch (action.type) {
    case SIGN_IN_START:
      return {
        accessToken: "",
        email: action.payload.email,
        error: false,
        processing: true,
        signedIn: false,
        success: false,
      };
    case SIGN_IN_SUCCESSFUL:
      return {
        accessToken: action.payload.accessToken,
        email: action.payload.email,
        error: false,
        processing: false,
        signedIn: true,
        success: true,
      };
    case SIGN_IN_FAILED:
      return {
        accessToken: "",
        email: "",
        error: false,
        processing: false,
        signedIn: false,
        success: false,
      };
    case SIGN_OUT:
      return {
        accessToken: "",
        email: "",
        error: false,
        processing: false,
        signedIn: false,
        success: true,
      };
    default:
      return state;
  }
};
