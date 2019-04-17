import axios from "axios";

import { IGeocodePayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const GET_GEOCODES_START = "GETGEOCODESSTART";
export const GetGeocodesStart = () => ({
  payload: null,
  type: GET_GEOCODES_START,
});

export const GET_GEOCODES_SUCCESSFUL = "GETGEOCODESUCCESSFUL";
export const GetGeocodeSuccessful = (payload: IGeocodePayload) => ({
  payload,
  type: GET_GEOCODES_SUCCESSFUL,
});

export const GET_GEOCODES_FAILD = "GETGEOCODESFAILD";
export const GetGeocodesFaild = () => ({
  payload: null,
  type: GET_GEOCODES_FAILD,
});

export const GetGeocodes = (user: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetGeocodesStart());
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/geocode`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetGeocodeSuccessful(response.data));
      dispatch(OpenSnackBar("Geocode Get Successfully"));
    } catch (error) {
      dispatch(GetGeocodesFaild());
      if (error.response) {
        dispatch(OpenSnackBar(`Get Geocodes  Failed: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Geocodes  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Geocodes  Failed: ${error.message}`));
      }
    }
  };
};
