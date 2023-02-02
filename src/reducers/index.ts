import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import advertiserReducer from "./advertiser";
import authReducer from "./auth";
import snackBarReducer from "./snackbar";

export default combineReducers<any, any>({
  advertiserReducer,
  authReducer,
  snackBarReducer,
  form: formReducer,
});
