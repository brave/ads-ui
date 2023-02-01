import {
  CREATE_CREATIVEINSTANCES_FAILED,
  CREATE_CREATIVEINSTANCES_START,
  CREATE_CREATIVEINSTANCES_SUCCESSFUL,
  DELETE_CREATIVEINSTANCES_FAILED,
  DELETE_CREATIVEINSTANCES_START,
  DELETE_CREATIVEINSTANCES_SUCCESSFUL,
  ICreativeInstanceAction,
  SIGN_OUT,
} from "../../actions";

import { createCreativeIstanceReducer } from "./creativeinstance.create";
import { ICreativeInstanceState } from "./creativeinstance.interface";
import { deleteCreativeInstanceReducer } from "./creativeinstance.delete";

const creativeSetReducer = (
  state: ICreativeInstanceState = {
    creativeInstances: [],
  },
  action: ICreativeInstanceAction,
) => {
  switch (action.type) {
    case DELETE_CREATIVEINSTANCES_FAILED:
    case DELETE_CREATIVEINSTANCES_START:
    case DELETE_CREATIVEINSTANCES_SUCCESSFUL:
      return deleteCreativeInstanceReducer(state, action);
    case CREATE_CREATIVEINSTANCES_FAILED:
    case CREATE_CREATIVEINSTANCES_START:
    case CREATE_CREATIVEINSTANCES_SUCCESSFUL:
      return createCreativeIstanceReducer(state, action);
    case SIGN_OUT:
      return {
        creativesets: [],
      };
    default:
      return state;
  }
};

export default creativeSetReducer;
