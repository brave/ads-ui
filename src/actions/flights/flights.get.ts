import axios from "axios";

import { IFlightAction, IFlightPayload } from ".";
import { IUserPayload } from "..";
import { OpenSnackBar } from "../snackbar";

export const GET_FLIGHTS_START = "GETFLIGHTSSTART";
export const GetFlightsStart = (): IFlightAction => ({
  payload: null,
  type: GET_FLIGHTS_START,
});

export const GET_FLIGHTS_SUCCESSFUL = "GETFLIGHTSUCCESSFUL";
export const GetFlightSuccessful = (payload: IFlightPayload[]): IFlightAction => ({
  payload,
  type: GET_FLIGHTS_SUCCESSFUL,
});

export const GET_FLIGHTS_FAILD = "GETFLIGHTSFAILD";
export const GetFlightsFaild = (): IFlightAction => ({
  payload: null,
  type: GET_FLIGHTS_FAILD,
});

export const GetFlights = (user: IUserPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetFlightsStart());
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/flight`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetFlightSuccessful(response.data));
      dispatch(OpenSnackBar("Flight Get Successfully"));
    } catch (error) {
      dispatch(GetFlightsFaild());
      if (error.response) {
        dispatch(OpenSnackBar(`Get Flights Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Flights Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Flights Faild: ${error.message}`));
      }
    }
  };
};
