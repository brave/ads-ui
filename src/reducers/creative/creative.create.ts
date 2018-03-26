import { CREATE_CREATIVES_FAILED, CREATE_CREATIVES_START, CREATE_CREATIVES_SUCCESSFUL } from "../../actions";

export const createCreativeReducer = (state: any, action: any) => {
  switch (action.type) {
    case CREATE_CREATIVES_START:
      return {
        ...state,
      };
    case CREATE_CREATIVES_SUCCESSFUL:
      return {
        creatives: [
          action.payload,
          ...state.creatives,
        ],
      };
    case CREATE_CREATIVES_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
