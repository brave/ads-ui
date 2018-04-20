import * as _ from "lodash";

import {
  IFlightAction,
  IFlightPayload,
  UPDATE_FLIGHTS_FAILED,
  UPDATE_FLIGHTS_START,
  UPDATE_FLIGHTS_SUCCESSFUL,
} from "../../actions";
import { IFlightState } from "./flight.interface";

export const updateFlightReducer = (state: IFlightState, action: IFlightAction): IFlightState => {
  switch (action.type) {
    case UPDATE_FLIGHTS_START:
      return {
        ...state,
      };
    case UPDATE_FLIGHTS_SUCCESSFUL:
      const flights = _.filter(state.flights, (item, index) => {
        return item.id !== (action.payload as IFlightPayload).id;
      });
      flights.unshift(action.payload as IFlightPayload);
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
