import axios from "axios";

import { IConfirmationTypeAction, IConfirmationTypePayload } from ".";
import { IAuthPayload } from "../auth";
import { OpenSnackBar } from "../snackbar";

export const GET_CONFIRMATIONTYPES_START = "GETCONFIRMATIONTYPESSTART";
export const GetConfirmationTypesStart = (): IConfirmationTypeAction => ({
  payload: null,
  type: GET_CONFIRMATIONTYPES_START,
});

export const GET_CONFIRMATIONTYPES_SUCCESSFUL = "GETCONFIRMATIONTYPESUCCESSFUL";
export const GetConfirmationTypeSuccessful = (payload: IConfirmationTypePayload): IConfirmationTypeAction => ({
  payload,
  type: GET_CONFIRMATIONTYPES_SUCCESSFUL,
});

export const GET_CONFIRMATIONTYPES_FAILD = "GETCONFIRMATIONTYPESFAILD";
export const GetConfirmationTypesFaild = (): IConfirmationTypeAction => ({
  payload: null,
  type: GET_CONFIRMATIONTYPES_FAILD,
});

export const GetConfirmationTypes = (user: IAuthPayload) => {
  return async (dispatch: any) => {
    try {
      dispatch(GetConfirmationTypesStart());
      const response = await axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/confirmationType`, {
        headers: {
          "Authorization": `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(GetConfirmationTypeSuccessful(response.data));
      dispatch(OpenSnackBar("ConfirmationTypes Get Successfully"));
    } catch (error) {
      dispatch(GetConfirmationTypesFaild());
      if (error.response) {
        dispatch(OpenSnackBar(`Get ConfirmationTypes  Failed: ${error.response.data.message}`));
      } else if (error.request) {
        dispatch(OpenSnackBar(`Get ConfirmationTypes  Failed: Network Error`));
      } else {
        dispatch(OpenSnackBar(`Get ConfirmationTypes  Failed: ${error.message}`));
      }
    }
  };
};
