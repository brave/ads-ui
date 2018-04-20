import {
  GET_SEGMENTS_FAILD,
  GET_SEGMENTS_START,
  GET_SEGMENTS_SUCCESSFUL,
  ISegmentAction,
} from "../../actions";

import { getSegmentReducer } from "./segment.get";
import { ISegmentState } from "./segment.interface";

const segmentReducer = (
  state: ISegmentState = {
    segments: [],
  },
  action: ISegmentAction,
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
