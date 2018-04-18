import { GET_SEGMENTS_FAILD, GET_SEGMENTS_START, GET_SEGMENTS_SUCCESSFUL } from "../../actions";

export const getSegmentReducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_SEGMENTS_START:
      return {
        ...state,
      };
    case GET_SEGMENTS_SUCCESSFUL:
      return {
        segments: action.payload,
      };
    case GET_SEGMENTS_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
