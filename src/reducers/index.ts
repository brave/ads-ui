import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./auth";
import campaignReducer from "./campaign";
import creativeReducer from "./creative";
import drawerReducer from "./drawer";
import geoCodeReducer from "./geocode";
import segmentReducer from "./segment";
import snackBarReducer from "./snackbar";

export default combineReducers({
  authReducer,
  campaignReducer,
  creativeReducer,
  drawerReducer,
  form: formReducer,
  geoCodeReducer,
  segmentReducer,
  snackBarReducer,
});
