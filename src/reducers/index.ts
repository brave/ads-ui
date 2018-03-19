import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import drawerReducer from "./drawer";
import userReducer from "./user";

export default combineReducers({
  drawerReducer,
  form: formReducer,
  userReducer,
});
