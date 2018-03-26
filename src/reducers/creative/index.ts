import {
  CREATE_CREATIVES_FAILED,
  CREATE_CREATIVES_START,
  CREATE_CREATIVES_SUCCESSFUL,
  GET_CREATIVES_FAILED,
  GET_CREATIVES_START,
  GET_CREATIVES_SUCCESSFUL,
} from "../../actions";

import { createCreativeReducer } from "./creative.create";
import { getCreativeReducer } from "./creative.get";

const creativeReducer = (
  state = {
    creatives: [],
  },
  action: any,
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
    default:
      return state;
  }
};

export default creativeReducer;
