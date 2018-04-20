import axios from "axios";

import { OpenSnackBar } from "../snackbar";

export const ADD_FLIGHT_GEOTARGETING_START = "ADDFLIGHTGEOTARGETINGSTART";
export const AddFlightGeoTargetingStart = (payload: any) => ({
  payload,
  type: ADD_FLIGHT_GEOTARGETING_START,
});

export const ADD_FLIGHT_GEOTARGETING_SUCCESSFUL = "ADDFLIGHTGEOTARGETINGSUCCESSFUL";
export const AddFlightGeoTargetingSuccessful = (payload: any) => ({
  payload,
  type: ADD_FLIGHT_GEOTARGETING_SUCCESSFUL,
});

export const ADD_FLIGHT_GEOTARGETING_FAILD = "ADDFLIGHTGEOTARGETINGFAILD";
export const AddFlightGeoTargetingFaild = (payload: any) => ({
  payload,
  type: ADD_FLIGHT_GEOTARGETING_FAILD,
});

export const AddFlightGeoTargeting = (flightID: string, user: any, geocode: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(AddFlightGeoTargetingStart);
      const response = await axios.post(`http://localhost:4000/flight/${flightID}/geocode`, geocode, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(AddFlightGeoTargetingSuccessful(response.data));
      dispatch(OpenSnackBar("Add Flight Geocode Successfully"));
    } catch (error) {
      dispatch(AddFlightGeoTargetingFaild(error));
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
