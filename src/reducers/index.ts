import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import advertiserReducer from "./advertiser";
import authReducer from "./auth";
import campaignReducer from "./campaign";
import creativeReducer from "./creative";
import drawerReducer from "./drawer";
import geoCodeReducer from "./geocode";
import segmentReducer from "./segment";
import snackBarReducer from "./snackbar";
import userReducer from "./user";

export default combineReducers({
  advertiserReducer,
  authReducer,
  campaignReducer,
  creativeReducer,
  drawerReducer,
  form: formReducer,
  geoCodeReducer,
  segmentReducer,
  snackBarReducer,
  userReducer,
});
