import {
  GET_GEOCODES_FAILD,
  GET_GEOCODES_START,
  GET_GEOCODES_SUCCESSFUL,
} from "../../actions";

import { getGeocodeReducer } from "./geocode.get";

const geoCodeReducer = (
  state = {
    flights: [],
  },
  action: any,
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
