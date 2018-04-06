import axios from "axios";

import { OpenSnackBar } from "../snackbar";

export const CREATE_FLIGHTS_START = "CREATEFLIGHTSSTART";
export const CreateFlightsStart = (payload: any) => ({
  payload,
  type: CREATE_FLIGHTS_START,
});

export const CREATE_FLIGHTS_SUCCESSFUL = "CREATEFLIGHTSSUCCESSFUL";
export const CreateFlightsSuccessful = (payload: any) => ({
  payload,
  type: CREATE_FLIGHTS_SUCCESSFUL,
});

export const CREATE_FLIGHTS_FAILED = "CREATEFLIGHTFAILED";
export const CreateFlightsFailed = (payload: any) => ({
  payload,
  type: CREATE_FLIGHTS_FAILED,
});

export const CreateFlights = (flight: any, user: any) => {
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
      dispatch(CreateFlightsFailed(error));
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
