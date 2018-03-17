import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import user from "./user";

export default combineReducers({
    form: formReducer,
    user,
});
