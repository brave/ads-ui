import { CREATE_FLIGHTS_FAILED, CREATE_FLIGHTS_START, CREATE_FLIGHTS_SUCCESSFUL } from "../../actions";

export const createFlightReducer = (state: any, action: any) => {
  switch (action.type) {
    case CREATE_FLIGHTS_START:
      return {
        ...state,
      };
    case CREATE_FLIGHTS_SUCCESSFUL:
      return {
        flights: [
          action.payload,
          ...state.flights,
        ],
      };
    case CREATE_FLIGHTS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
