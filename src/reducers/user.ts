import { SIGN_IN_FAILED, SIGN_IN_START, SIGN_IN_SUCCESSFUL, SIGN_OUT } from "../actions";

const user = (
  state = {
    accessToken: "",
    email: "",
    error: "",
    processing: false,
    signedIn: false,
    success: "",
  },
  action: any,
) => {
  switch (action.type) {
    case SIGN_IN_START:
      return {
        accessToken: "",
        email: action.payload.email,
        error: "",
        processing: true,
        signedIn: false,
        success: "",
      };
    case SIGN_IN_SUCCESSFUL:
      return {
        accessToken: action.payload.accessToken,
        email: action.payload.email,
        error: "",
        processing: false,
        signedIn: true,
        success: true,
      };
    case SIGN_IN_FAILED:
      return {
        accessToken: "",
        email: "",
        error: "Failed To Login",
        processing: false,
        signedIn: false,
        success: false,
      };
    case SIGN_OUT:
      return {
        accessToken: "",
        email: "",
        error: "",
        processing: false,
        signedIn: false,
        success: "",
      };
    default:
      return state;
  }
};

export default user;
