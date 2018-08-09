import * as jwtDecode from "jwt-decode";

import { ISignInPayload, SIGN_IN_FAILED, SIGN_IN_START, SIGN_IN_SUCCESSFUL, SIGN_OUT } from "../../actions";
import { IAuthAction, IAuthPayload } from "../../actions";

import { IAuthState } from "./auth.interface";

export const signInReducer = (state: IAuthState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case SIGN_IN_START:
      return {
        accessToken: "",
        email: (action.payload as ISignInPayload).email,
        emailVerified: false,
        id: "",
        role: "",
        signedIn: false,
      };
    case SIGN_IN_SUCCESSFUL:
      const accessToken = (action.payload as IAuthPayload).accessToken;
      const decodedToken = jwtDecode(accessToken) as IAuthState;
      return {
        accessToken,
        email: decodedToken.email,
        emailVerified: decodedToken.emailVerified,
        id: decodedToken.id,
        role: decodedToken.role,
        signedIn: true,
      };
    case SIGN_IN_FAILED:
      return {
        accessToken: "",
        email: "",
        emailVerified: false,
        id: "",
        role: "",
        signedIn: false,
      };
    case SIGN_OUT:
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
