import {
  GET_SEGMENTS_FAILD,
  GET_SEGMENTS_START,
  GET_SEGMENTS_SUCCESSFUL,
} from "../../actions";

import { getSegmentReducer } from "./segment.get";

const segmentReducer = (
  state = {
    flights: [],
  },
  action: any,
) => {
  switch (action.type) {
    case GET_SEGMENTS_START:
    case GET_SEGMENTS_FAILD:
    case GET_SEGMENTS_SUCCESSFUL:
      return getSegmentReducer(state, action);
    default:
      return state;
  }
};

export default segmentReducer;
