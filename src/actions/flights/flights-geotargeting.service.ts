import axios from "axios";

import { IFlightAction, IFlightGeoTargetingPayload } from ".";
import { IUserPayload } from "..";
import { OpenSnackBar } from "../snackbar";

export const ADD_FLIGHT_GEOTARGETING_START = "ADDFLIGHTGEOTARGETINGSTART";
export const AddFlightGeoTargetingStart = (payload: IFlightGeoTargetingPayload): IFlightAction => ({
  payload,
  type: ADD_FLIGHT_GEOTARGETING_START,
});

export const ADD_FLIGHT_GEOTARGETING_SUCCESSFUL = "ADDFLIGHTGEOTARGETINGSUCCESSFUL";
export const AddFlightGeoTargetingSuccessful = (payload: any): IFlightAction => ({
  payload,
  type: ADD_FLIGHT_GEOTARGETING_SUCCESSFUL,
});

export const ADD_FLIGHT_GEOTARGETING_FAILD = "ADDFLIGHTGEOTARGETINGFAILD";
export const AddFlightGeoTargetingFaild = (): IFlightAction => ({
  payload: null,
  type: ADD_FLIGHT_GEOTARGETING_FAILD,
});

export const AddFlightGeoTargeting = (flightID: string, user: IUserPayload, geocode: IFlightGeoTargetingPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(AddFlightGeoTargetingStart(geocode));
      const response = await axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/flight/${flightID}/geotargeting`,
        geocode, {
          headers: {
            "Authorization": `Bearer ${user.accessToken}`,
            "Content-Type": "application/json",
          },
        });
      dispatch(AddFlightGeoTargetingSuccessful(response.data));
      dispatch(OpenSnackBar("Add Flight Geocode Successfully"));
    } catch (error) {
      dispatch(AddFlightGeoTargetingFaild());
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
