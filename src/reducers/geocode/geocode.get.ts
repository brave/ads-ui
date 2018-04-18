import { GET_GEOCODES_FAILD, GET_GEOCODES_START, GET_GEOCODES_SUCCESSFUL } from "../../actions";

export const getGeocodeReducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_GEOCODES_START:
      return {
        ...state,
      };
    case GET_GEOCODES_SUCCESSFUL:
      return {
        geocodes: action.payload,
      };
    case GET_GEOCODES_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
