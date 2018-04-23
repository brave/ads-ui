import axios from "axios";

import { OpenSnackBar } from "../snackbar";

export const UPDATE_FLIGHTS_START = "UPDATEFLIGHTSSTART";
export const UpdateFlightsStart = (payload: any) => ({
  payload,
  type: UPDATE_FLIGHTS_START,
});

export const UPDATE_FLIGHTS_SUCCESSFUL = "UPDATEFLIGHTSSUCCESSFUL";
export const UpdateFlightsSuccessful = (payload: any) => ({
  payload,
  type: UPDATE_FLIGHTS_SUCCESSFUL,
});

export const UPDATE_FLIGHTS_FAILED = "UPDATEFLIGHTFAILED";
export const UpdateFlightsFailed = (payload: any) => ({
  payload,
  type: UPDATE_FLIGHTS_FAILED,
});

export const UpdateFlights = (flight: any, user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(UpdateFlightsStart(user));
      const response = await axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/flight/${flight.id}`, flight, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(UpdateFlightsSuccessful(response.data));
      dispatch(OpenSnackBar("Flight updated Successfully"));
    } catch (error) {
      dispatch(UpdateFlightsFailed(error));
      if (error.response) {
        dispatch(OpenSnackBar(`Update Flights Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Update Flights Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Update Flights Faild: ${error.message}`));
      }
    }
  };
};
