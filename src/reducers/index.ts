import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import userReducer from "./user";

export default combineReducers({
    form: formReducer,
    userReducer,
});
