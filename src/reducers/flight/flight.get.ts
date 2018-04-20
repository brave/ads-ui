import {
  GET_FLIGHTS_FAILD,
  GET_FLIGHTS_START,
  GET_FLIGHTS_SUCCESSFUL,
  IFlightAction,
  IFlightPayload,
} from "../../actions";
import { IFlightState } from "./flight.interface";

export const getFlightReducer = (state: IFlightState, action: IFlightAction): IFlightState => {
  switch (action.type) {
    case GET_FLIGHTS_START:
      return {
        ...state,
      };
    case GET_FLIGHTS_SUCCESSFUL:
      return {
        flights: action.payload as IFlightPayload[],
      };
    case GET_FLIGHTS_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
