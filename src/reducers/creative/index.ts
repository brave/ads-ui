import {
  CREATE_CREATIVES_FAILED,
  CREATE_CREATIVES_START,
  CREATE_CREATIVES_SUCCESSFUL,
  GET_CREATIVES_FAILED,
  GET_CREATIVES_START,
  GET_CREATIVES_SUCCESSFUL,
  ICreativeAction,
  SIGN_OUT,
} from "../../actions";

import { createCreativeReducer } from "./creative.create";
import { getCreativeReducer } from "./creative.get";
import { ICreativeState } from "./creative.interface";

const creativeReducer = (
  state: ICreativeState = {
    creatives: [],
  },
  action: ICreativeAction,
) => {
  switch (action.type) {
    case GET_CREATIVES_START:
    case GET_CREATIVES_SUCCESSFUL:
    case GET_CREATIVES_FAILED:
      return getCreativeReducer(state, action);
    case CREATE_CREATIVES_FAILED:
    case CREATE_CREATIVES_START:
    case CREATE_CREATIVES_SUCCESSFUL:
      return createCreativeReducer(state, action);
    case SIGN_OUT:
      return {
        creatives: [],
      };
    default:
      return state;
  }
};

export default creativeReducer;
