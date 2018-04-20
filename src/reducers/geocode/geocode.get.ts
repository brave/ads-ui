import {
  GET_GEOCODES_FAILD,
  GET_GEOCODES_START,
  GET_GEOCODES_SUCCESSFUL,
  IGeocodeAction,
  IGeocodePayload,
} from "../../actions";
import { IGeocodeState } from "./geocode.interface";

export const getGeocodeReducer = (state: IGeocodeState, action: IGeocodeAction): IGeocodeState => {
  switch (action.type) {
    case GET_GEOCODES_START:
      return {
        ...state,
      };
    case GET_GEOCODES_SUCCESSFUL:
      return {
        geocodes: action.payload as IGeocodePayload[],
      };
    case GET_GEOCODES_FAILD:
      return {
        ...state,
      };
    default:
      return state;
  }
};
