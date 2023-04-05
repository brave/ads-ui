import { combineReducers } from "redux";

import advertiserReducer from "./advertiser";
import authReducer from "./auth";
import snackBarReducer from "./snackbar";
import { reducer as formReducer } from "redux-form";

export default combineReducers<any, any>({
  advertiserReducer,
  authReducer,
  snackBarReducer,
  form: formReducer,
});
