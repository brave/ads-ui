import { GET_FLIGHTS_FAILD, GET_FLIGHTS_START, GET_FLIGHTS_SUCCESSFUL } from "../../actions";

export const getFlightReducer = (state: any, action: any) => {
  switch (action.type) {
    case GET_FLIGHTS_START:
      return {
        ...state,
      };
    case GET_FLIGHTS_SUCCESSFUL:
      return {
        flights: action.payload,
      };
    case GET_FLIGHTS_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
