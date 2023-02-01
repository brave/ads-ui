import {
  CREATE_CREATIVESETS_FAILED,
  CREATE_CREATIVESETS_START,
  CREATE_CREATIVESETS_SUCCESSFUL,
  ICreativeSetAction,
  SIGN_OUT,
} from "../../actions";

import { createCreativeSetReducer } from "./creativeset.create";
import { ICreativeSetState } from "./creativeset.interface";

const creativeSetReducer = (
  state: ICreativeSetState = {
    creativesets: [],
  },
  action: ICreativeSetAction,
) => {
  switch (action.type) {
    case CREATE_CREATIVESETS_FAILED:
    case CREATE_CREATIVESETS_START:
    case CREATE_CREATIVESETS_SUCCESSFUL:
      return createCreativeSetReducer(state, action);
    case SIGN_OUT:
      return {
        creativesets: [],
      };
    default:
      return state;
  }
};

export default creativeSetReducer;
