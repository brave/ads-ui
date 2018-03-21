import { GET_CREATIVES_FAILED, GET_CREATIVES_START, GET_CREATIVES_SUCCESSFUL } from "../../actions";

import { getCreativeReducer } from "./creative.get";

const creativeReducer = (
  state = {
    creatives: [],
    processing: false,
  },
  action: any,
) => {
  switch (action.type) {
    case GET_CREATIVES_START:
    case GET_CREATIVES_SUCCESSFUL:
    case GET_CREATIVES_FAILED:
      return getCreativeReducer(state, action);
    default:
      return state;
  }
};

export default creativeReducer;
