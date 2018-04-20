import axios from "axios";

import { ICreateFlightPayload, IFlightAction, IFlightPayload } from ".";
import { IUserPayload } from "..";
import { OpenSnackBar } from "../snackbar";

export const CREATE_FLIGHTS_START = "CREATEFLIGHTSSTART";
export const CreateFlightsStart = (payload: ICreateFlightPayload): IFlightAction => ({
  payload,
  type: CREATE_FLIGHTS_START,
});

export const CREATE_FLIGHTS_SUCCESSFUL = "CREATEFLIGHTSSUCCESSFUL";
export const CreateFlightsSuccessful = (payload: IFlightPayload): IFlightAction => ({
  payload,
  type: CREATE_FLIGHTS_SUCCESSFUL,
});

export const CREATE_FLIGHTS_FAILED = "CREATEFLIGHTFAILED";
export const CreateFlightsFailed = (): IFlightAction => ({
  payload: null,
  type: CREATE_FLIGHTS_FAILED,
});

export const CreateFlights = (flight: ICreateFlightPayload, user: IUserPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(CreateFlightsStart(flight));
      const response = await axios.post(`http://localhost:4000/flight`, flight, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(OpenSnackBar("Flight created Successfully"));
      dispatch(CreateFlightsSuccessful(response.data));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(CreateFlightsFailed());
      if (error.response) {
        dispatch(OpenSnackBar(`Create Flights Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Create Flights Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Create Flights Faild: ${error.message}`));
      }
    }
  };
};
