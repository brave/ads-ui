import axios from "axios";

import { OpenSnackBar } from "../snackbar";

export const ADD_FLIGHT_GEOCODE_START = "ADDFLIGHTGEOCODESTART";
export const AddFlightGeocodeStart = (payload: any) => ({
  payload,
  type: ADD_FLIGHT_GEOCODE_START,
});

export const ADD_FLIGHT_GEOCODE_SUCCESSFUL = "ADDFLIGHTGEOCODESUCCESSFUL";
export const AddFlightGeocodeSuccessful = (payload: any) => ({
  payload,
  type: ADD_FLIGHT_GEOCODE_SUCCESSFUL,
});

export const ADD_FLIGHT_GEOCODE_FAILD = "ADDFLIGHTGEOCODEFAILD";
export const AddFlightGeocodeFaild = (payload: any) => ({
  payload,
  type: ADD_FLIGHT_GEOCODE_FAILD,
});

export const AddFlightGeoCode = (flightID: string, user: any, geocode: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(AddFlightGeocodeStart);
      const response = await axios.post(`http://localhost:4000/flight/${flightID}/geocode`, geocode, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(AddFlightGeocodeSuccessful(response.data));
      dispatch(OpenSnackBar("Add Flight Geocode Successfully"));
    } catch (error) {
      dispatch(AddFlightGeocodeFaild(error));
      if (error.response) {
        dispatch(OpenSnackBar(`Add Flight Geocode Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Add Flight Geocode Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Add Flight Geocode Faild: ${error.message}`));
      }
    }
  };
};
