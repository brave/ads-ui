import axios from "axios";

import { ISegmentAction, ISegmentPayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const GET_SEGMENTS_START = "GETSEGMENTSSTART";
export const GetSegmentsStart = (): ISegmentAction => ({
  payload: null,
  type: GET_SEGMENTS_START,
});

export const GET_SEGMENTS_SUCCESSFUL = "GETSEGMENTSUCCESSFUL";
export const GetSegmentSuccessful = (payload: ISegmentPayload): ISegmentAction => ({
  payload,
  type: GET_SEGMENTS_SUCCESSFUL,
});

export const GET_SEGMENTS_FAILD = "GETSEGMENTSFAILD";
export const GetSegmentsFaild = (): ISegmentAction => ({
  payload: null,
  type: GET_SEGMENTS_FAILD,
});

export const GetSegments = (user: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetSegmentsStart());
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/segment`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetSegmentSuccessful(response.data));
      dispatch(OpenSnackBar("Segment Get Successfully"));
    } catch (error: any) {
      dispatch(GetSegmentsFaild());
      if (error.response) {
        dispatch(OpenSnackBar(`Get Segments  Failed: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get Segments  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get Segments  Failed: ${error.message}`));
      }
    }
  };
};
