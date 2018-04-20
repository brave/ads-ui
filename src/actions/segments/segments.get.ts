import axios from "axios";

import { ISegmentAction, ISegmentPayload } from ".";
import { IUserPayload } from "..";
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

export const GetSegments = (user: IUserPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetSegmentsStart());
      const response = await axios.get(`http://localhost:4000/segment`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetSegmentSuccessful(response.data));
      dispatch(OpenSnackBar("Segment Get Successfully"));
    } catch (error) {
      dispatch(GetSegmentsFaild());
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
