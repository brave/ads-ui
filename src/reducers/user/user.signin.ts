import * as jwtDecode from "jwt-decode";

import { ISignInPayload, SIGN_IN_FAILED, SIGN_IN_START, SIGN_IN_SUCCESSFUL, SIGN_OUT } from "../../actions";
import { IUserAction, IUserPayload } from "../../actions";

import { IUserState } from "./user.interface";

export const signInReducer = (state: IUserState, action: IUserAction): IUserState => {
  switch (action.type) {
    case SIGN_IN_START:
      return {
        accessToken: "",
        email: (action.payload as ISignInPayload).email,
        id: "",
        role: "",
        signedIn: false,
      };
    case SIGN_IN_SUCCESSFUL:
      const accessToken = (action.payload as IUserPayload).accessToken;
      const decodedToken = jwtDecode(accessToken) as any;
      return {
        accessToken,
        email: decodedToken.email,
        id: decodedToken.id,
        role: decodedToken.role,
        signedIn: true,
      };
    case SIGN_IN_FAILED:
      return {
        accessToken: "",
        email: "",
        id: "",
        role: "",
        signedIn: false,
      };
    case SIGN_OUT:
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
