import {
  CREATE_CREATIVESETS_FAILED,
  CREATE_CREATIVESETS_START,
  CREATE_CREATIVESETS_SUCCESSFUL,
  GET_CREATIVESETS_FAILD,
  GET_CREATIVESETS_START,
  GET_CREATIVESETS_SUCCESSFUL,
  ICreativeSetAction,
  SIGN_OUT,
  UPDATE_CREATIVESETS_FAILED,
  UPDATE_CREATIVESETS_START,
  UPDATE_CREATIVESETS_SUCCESSFUL,
} from "../../actions";

import { createCreativeSetReducer } from "./creativeset.create";
import { getCreativeSetReducer } from "./creativeset.get";
import { ICreativeSetState } from "./creativeset.interface";
import { updateCreativeSetReducer } from "./creativeset.update";

const creativeSetReducer = (
  state: ICreativeSetState = {
    creativesets: [],
  },
  action: ICreativeSetAction,
) => {
  switch (action.type) {
    case GET_CREATIVESETS_START:
    case GET_CREATIVESETS_FAILD:
    case GET_CREATIVESETS_SUCCESSFUL:
      return getCreativeSetReducer(state, action);
    case UPDATE_CREATIVESETS_FAILED:
    case UPDATE_CREATIVESETS_START:
    case UPDATE_CREATIVESETS_SUCCESSFUL:
      return updateCreativeSetReducer(state, action);
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
