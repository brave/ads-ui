import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import advertiserReducer from "./advertiser";
import authReducer from "./auth";
import campaignReducer from "./campaign";
import creativeReducer from "./creative";
import creativeInstanceReducer from "./creativeinstance";
import creativeSetReducer from "./creativeset";
import creativeTypeReducer from "./creativetype";
import drawerReducer from "./drawer";
import geoCodeReducer from "./geocode";
import segmentReducer from "./segment";
import snackBarReducer from "./snackbar";

export default combineReducers<any, any>({
  advertiserReducer,
  authReducer,
  campaignReducer,
  creativeInstanceReducer,
  creativeReducer,
  creativeSetReducer,
  creativeTypeReducer,
  drawerReducer,
  form: formReducer,
  geoCodeReducer,
  segmentReducer,
  snackBarReducer,
});
