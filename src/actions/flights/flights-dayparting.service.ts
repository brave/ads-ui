import axios from "axios";

import { IFlightAction, IFlightDayPartingPayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const ADD_FLIGHT_DAYPARTING_START = "ADDFLIGHTDAYPARTINGSTART";
export const AddFlightDaypartingStart = (payload: IFlightDayPartingPayload): IFlightAction => ({
  payload,
  type: ADD_FLIGHT_DAYPARTING_START,
});

export const ADD_FLIGHT_DAYPARTING_SUCCESSFUL = "ADDFLIGHTDAYPARTINGSUCCESSFUL";
export const AddFlightDaypartingSuccessful = (payload: any): IFlightAction => ({
  payload,
  type: ADD_FLIGHT_DAYPARTING_SUCCESSFUL,
});

export const ADD_FLIGHT_DAYPARTING_FAILD = "ADDFLIGHTDAYPARTINGFAILD";
export const AddFlightDaypartingFaild = (): IFlightAction => ({
  payload: null,
  type: ADD_FLIGHT_DAYPARTING_FAILD,
});

export const AddFlightDayparting = (flightID: string, user: IAuthPayload, dayparting: IFlightDayPartingPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(AddFlightDaypartingStart(dayparting));
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/flight/${flightID}/dayparting`,
        dayparting,
        {
          headers: {
            "Authorization": `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        });
      dispatch(AddFlightDaypartingSuccessful(response.data));
      dispatch(OpenSnackBar("Add Flight Dayparting Successfully"));
    } catch (error) {
      dispatch(AddFlightDaypartingFaild());
      if (error.response) {
        dispatch(OpenSnackBar(`Add Flight Dayparting Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Add Flight Dayparting Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Add Flight Dayparting Faild: ${error.message}`));
      }
    }
  };
};
