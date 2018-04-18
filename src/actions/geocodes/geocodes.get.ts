import axios from "axios";

import { OpenSnackBar } from "../snackbar";

export const GET_GEOCODES_START = "GETGEOCODESSTART";
export const GetGeocodesStart = (payload: any) => ({
  payload,
  type: GET_GEOCODES_START,
});

export const GET_GEOCODES_SUCCESSFUL = "GETGEOCODESUCCESSFUL";
export const GetGeocodeSuccessful = (payload: any) => ({
  payload,
  type: GET_GEOCODES_SUCCESSFUL,
});

export const GET_GEOCODES_FAILD = "GETGEOCODESFAILD";
export const GetGeocodesFaild = (payload: any) => ({
  payload,
  type: GET_GEOCODES_FAILD,
});

export const GetGeocodes = (user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetGeocodesStart);
      const response = await axios.get(`http://localhost:4000/geocode`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetGeocodeSuccessful(response.data));
      dispatch(OpenSnackBar("Geocode Get Successfully"));
    } catch (error) {
      dispatch(GetGeocodesFaild(error));
      if (error.response) {
        dispatch(OpenSnackBar(`Get Geocodes Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Geocodes Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Geocodes Faild: ${error.message}`));
      }
    }
  };
};
