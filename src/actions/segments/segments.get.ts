import axios from "axios";

import { OpenSnackBar } from "../snackbar";

export const GET_SEGMENTS_START = "GETSEGMENTSSTART";
export const GetSegmentsStart = (payload: any) => ({
  payload,
  type: GET_SEGMENTS_START,
});

export const GET_SEGMENTS_SUCCESSFUL = "GETSEGMENTSUCCESSFUL";
export const GetSegmentSuccessful = (payload: any) => ({
  payload,
  type: GET_SEGMENTS_SUCCESSFUL,
});

export const GET_SEGMENTS_FAILD = "GETSEGMENTSFAILD";
export const GetSegmentsFaild = (payload: any) => ({
  payload,
  type: GET_SEGMENTS_FAILD,
});

export const GetSegments = (user: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetSegmentsStart);
      const response = await axios.get(`http://localhost:4000/segment`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetSegmentSuccessful(response.data));
      dispatch(OpenSnackBar("Segment Get Successfully"));
    } catch (error) {
      dispatch(GetSegmentsFaild(error));
      if (error.response) {
        dispatch(OpenSnackBar(`Get Segments Faild: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Segments Faild: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Segments Faild: ${error.message}`));
      }
    }
  };
};
