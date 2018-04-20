import {
  CREATE_FLIGHTS_FAILED,
  CREATE_FLIGHTS_START,
  CREATE_FLIGHTS_SUCCESSFUL,
  IFlightAction,
  IFlightPayload,
} from "../../actions";
import { IFlightState } from "./flight.interface";

export const createFlightReducer = (state: IFlightState, action: IFlightAction): IFlightState => {
  switch (action.type) {
    case CREATE_FLIGHTS_START:
      return {
        ...state,
      };
    case CREATE_FLIGHTS_SUCCESSFUL:
      return {
        flights: [
          action.payload as IFlightPayload,
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
