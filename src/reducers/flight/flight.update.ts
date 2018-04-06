import * as _ from "lodash";

import { UPDATE_FLIGHTS_FAILED, UPDATE_FLIGHTS_START, UPDATE_FLIGHTS_SUCCESSFUL } from "../../actions";

export const updateFlightReducer = (state: any, action: any) => {
  switch (action.type) {
    case UPDATE_FLIGHTS_START:
      return {
        ...state,
      };
    case UPDATE_FLIGHTS_SUCCESSFUL:
      const flights = _.filter(state.flights, (item, index) => {
        return item.id !== action.payload.id;
      });
      flights.unshift(action.payload);
      return {
        flights,
      };
    case UPDATE_FLIGHTS_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
