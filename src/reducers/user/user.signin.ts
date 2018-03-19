import { SIGN_IN_FAILED, SIGN_IN_START, SIGN_IN_SUCCESSFUL, SIGN_OUT } from "../../actions";
import { ISignInSuccessfulPayload, IUserAction } from "../../actions";

import { IUserState } from "./user.interface";

export const signInReducer = (state: IUserState, action: IUserAction): IUserState => {
  switch (action.type) {
    case SIGN_IN_START:
      return {
        accessToken: "",
        email: action.payload.email,
        error: false,
        id: "",
        processing: true,
        signedIn: false,
        success: false,
      };
    case SIGN_IN_SUCCESSFUL:
      return {
        accessToken: (action.payload as ISignInSuccessfulPayload).accessToken,
        email: action.payload.email,
        error: false,
        id: (action.payload as ISignInSuccessfulPayload).id,
        processing: false,
        signedIn: true,
        success: true,
      };
    case SIGN_IN_FAILED:
      return {
        accessToken: "",
        email: "",
        error: false,
        id: "",
        processing: false,
        signedIn: false,
        success: false,
      };
    case SIGN_OUT:
      return {
        accessToken: "",
        email: "",
        error: false,
        id: "",
        processing: false,
        signedIn: false,
        success: true,
      };
    default:
      return state;
  }
};
