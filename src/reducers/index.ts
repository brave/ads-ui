import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import creativeReducer from "./creative";
import drawerReducer from "./drawer";
import snackBarReducer from "./snackbar";
import userReducer from "./user";

export default combineReducers({
  creativeReducer,
  drawerReducer,
  form: formReducer,
  snackBarReducer,
  userReducer,
});
