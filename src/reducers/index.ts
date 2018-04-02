import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import campaignReducer from "./campaign";
import creativeReducer from "./creative";
import drawerReducer from "./drawer";
import snackBarReducer from "./snackbar";
import userReducer from "./user";

export default combineReducers({
  campaignReducer,
  creativeReducer,
  drawerReducer,
  form: formReducer,
  snackBarReducer,
  userReducer,
});
