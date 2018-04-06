import {
  CREATE_FLIGHTS_FAILED,
  CREATE_FLIGHTS_START,
  CREATE_FLIGHTS_SUCCESSFUL,
  GET_FLIGHTS_FAILD,
  GET_FLIGHTS_START,
  GET_FLIGHTS_SUCCESSFUL,
  UPDATE_FLIGHTS_FAILED,
  UPDATE_FLIGHTS_START,
  UPDATE_FLIGHTS_SUCCESSFUL,
} from "../../actions";

import { createFlightReducer } from "./flight.create";
import { getFlightReducer } from "./flight.get";
import { updateFlightReducer } from "./flight.update";

const flightReducer = (
  state = {
    flights: [],
  },
  action: any,
) => {
  switch (action.type) {
    case GET_FLIGHTS_START:
    case GET_FLIGHTS_FAILD:
    case GET_FLIGHTS_SUCCESSFUL:
      return getFlightReducer(state, action);
    case UPDATE_FLIGHTS_FAILED:
    case UPDATE_FLIGHTS_START:
    case UPDATE_FLIGHTS_SUCCESSFUL:
      return updateFlightReducer(state, action);
    case CREATE_FLIGHTS_FAILED:
    case CREATE_FLIGHTS_START:
    case CREATE_FLIGHTS_SUCCESSFUL:
      return createFlightReducer(state, action);
    default:
      return state;
  }
};

export default flightReducer;
