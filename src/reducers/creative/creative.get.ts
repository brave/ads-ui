import { GET_CREATIVES_FAILED, GET_CREATIVES_START, GET_CREATIVES_SUCCESSFUL } from "../../actions";

export const getCreativeReducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_CREATIVES_START:
      return {
        processing: true,
        ...state,
      };
    case GET_CREATIVES_SUCCESSFUL:
      return {
        creatives: action.payload,
        processing: false,
      };
    case GET_CREATIVES_FAILED:
      return {
        processing: false,
        ...state,
      };
    default:
      return state;
  }
};
