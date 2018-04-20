import {
  GET_SEGMENTS_FAILD,
  GET_SEGMENTS_START,
  GET_SEGMENTS_SUCCESSFUL,
  ISegmentAction,
  ISegmentPayload,
} from "../../actions";
import { ISegmentState } from "./segment.interface";

export const getSegmentReducer = (state: ISegmentState, action: ISegmentAction): ISegmentState => {
  switch (action.type) {
    case GET_SEGMENTS_START:
      return {
        ...state,
      };
    case GET_SEGMENTS_SUCCESSFUL:
      return {
        segments: action.payload as ISegmentPayload[],
      };
    case GET_SEGMENTS_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
