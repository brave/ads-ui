import {
  GET_GEOCODES_FAILD,
  GET_GEOCODES_START,
  GET_GEOCODES_SUCCESSFUL,
  IGeocodeAction,
} from "../../actions";

import { getGeocodeReducer } from "./geocode.get";
import { IGeocodeState } from "./geocode.interface";

const geoCodeReducer = (
  state: IGeocodeState = {
    geocodes: [],
  },
  action: IGeocodeAction,
) => {
  switch (action.type) {
    case GET_GEOCODES_START:
    case GET_GEOCODES_FAILD:
    case GET_GEOCODES_SUCCESSFUL:
      return getGeocodeReducer(state, action);
    default:
      return state;
  }
};

export default geoCodeReducer;
