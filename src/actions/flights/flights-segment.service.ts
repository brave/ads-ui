import axios from "axios";

import { IFlightSegmentPayload } from ".";
import { IUserPayload } from "..";
import { OpenSnackBar } from "../snackbar";

export const ADD_FLIGHT_SEGMENT_START = "ADDFLIGHTSEGMENTSTART";
export const AddFlightSegmentStart = (payload: IFlightSegmentPayload) => ({
  payload,
  type: ADD_FLIGHT_SEGMENT_START,
});

export const ADD_FLIGHT_SEGMENT_SUCCESSFUL = "ADDFLIGHTSEGMENTSUCCESSFUL";
export const AddFlightSegmentSuccessful = (payload: IFlightSegmentPayload) => ({
  payload,
  type: ADD_FLIGHT_SEGMENT_SUCCESSFUL,
});

export const ADD_FLIGHT_SEGMENT_FAILD = "ADDFLIGHTSEGMENTFAILD";
export const AddFlightSegmentFaild = () => ({
  payload: null,
  type: ADD_FLIGHT_SEGMENT_FAILD,
});

export const AddFlightSegment = (flightID: string, user: IUserPayload, segment: IFlightSegmentPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(AddFlightSegmentStart(segment));
      const response = await axios.post(`http://localhost:4000/flight/${flightID}/segment`, segment, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(AddFlightSegmentSuccessful(response.data));
      dispatch(OpenSnackBar("Add Flight Segment Successfully"));
    } catch (error) {
      dispatch(AddFlightSegmentFaild());
      if (error.response) {
        dispatch(OpenSnackBar(`Add Flight Segment Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Add Flight Segment Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Add Flight Segment Faild: ${error.message}`));
      }
    }
  };
};
