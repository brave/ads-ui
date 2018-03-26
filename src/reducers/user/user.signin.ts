import { SIGN_IN_FAILED, SIGN_IN_START, SIGN_IN_SUCCESSFUL, SIGN_OUT } from "../../actions";
import { ISignInSuccessfulPayload, IUserAction } from "../../actions";

import { IUserState } from "./user.interface";

export const signInReducer = (state: IUserState, action: IUserAction): IUserState => {
  switch (action.type) {
    case SIGN_IN_START:
      return {
        accessToken: "",
        email: action.payload.email,
        id: "",
        signedIn: false,
      };
    case SIGN_IN_SUCCESSFUL:
      return {
        accessToken: (action.payload as ISignInSuccessfulPayload).accessToken,
        email: action.payload.email,
        id: (action.payload as ISignInSuccessfulPayload).id,
        signedIn: true,
      };
    case SIGN_IN_FAILED:
      return {
        accessToken: "",
        email: "",
        id: "",
        signedIn: false,
      };
    case SIGN_OUT:
      return {
        accessToken: "",
        email: "",
        id: "",
        signedIn: false,
      };
    default:
      return state;
  }
};
