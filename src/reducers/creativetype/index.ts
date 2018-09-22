import {
  GET_CREATIVETYPES_FAILD,
  GET_CREATIVETYPES_START,
  GET_CREATIVETYPES_SUCCESSFUL,
  ICreativeTypeAction,
} from "../../actions";

import { getCreativeTypeReducer } from "./creativetype.get";
import { ICreativeTypeState } from "./creativetype.interface";

const creativeTypeReducer = (
  state: ICreativeTypeState = {
    creativeTypes: [],
  },
  action: ICreativeTypeAction,
) => {
  switch (action.type) {
    case GET_CREATIVETYPES_FAILD:
    case GET_CREATIVETYPES_START:
    case GET_CREATIVETYPES_SUCCESSFUL:
      return getCreativeTypeReducer(state, action);
    default:
      return state;
  }
};

export default creativeTypeReducer;
