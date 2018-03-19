import { SIGN_UP_FAILED, SIGN_UP_START, SIGN_UP_SUCCESSFUL } from "../../actions";

import { IUserState } from "./user.interface";

export const signUpReducer = (state: IUserState, action: any): IUserState => {
  switch (action.type) {
    case SIGN_UP_START:
      return {
        accessToken: "",
        email: action.payload.email,
        error: false,
        id: "",
        processing: true,
        signedIn: false,
        success: false,
      };
    case SIGN_UP_SUCCESSFUL:
      return {
        accessToken: "",
        email: action.payload.email,
        error: false,
        id: "",
        processing: false,
        signedIn: false,
        success: true,
      };
    case SIGN_UP_FAILED:
      return {
        accessToken: "",
        email: "",
        error: true,
        errorObject: action.payload,
        id: "",
        processing: false,
        signedIn: false,
        success: false,
      };
    default:
      return state;
  }
};
