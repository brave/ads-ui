import { UPDATE_CREATIVES_FAILED, UPDATE_CREATIVES_START, UPDATE_CREATIVES_SUCCESSFUL } from "../../actions";

export const updateCreativeReducer = (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_CREATIVES_START:
      return {
        ...state,
      };
    case UPDATE_CREATIVES_SUCCESSFUL:
      return {
        creatives: [
          action.payload,
          ...state.creatives,
        ],
      };
    case UPDATE_CREATIVES_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
