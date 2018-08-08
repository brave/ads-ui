import {
  GETALL_USER_FAILED,
  GETALL_USER_START,
  GETALL_USER_SUCCESSFUL,
  IUserAction,
  USER_CREATE_FAILED,
  USER_CREATE_START,
  USER_CREATE_SUCCESSFUL,
  USER_UPDATE_FAILED,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESSFUL,
} from "../../actions";
import { createUserReducer } from "./user.create";
import { getUserReducer } from "./user.get";
import { IUserState } from "./user.interface";

const userReducer = (
  state: IUserState = {
    users: [],
  },
  action: IUserAction,
) => {
  switch (action.type) {
    case GETALL_USER_START:
    case GETALL_USER_FAILED:
    case GETALL_USER_SUCCESSFUL:
      return getUserReducer(state, action);
    case USER_CREATE_FAILED:
    case USER_CREATE_START:
    case USER_CREATE_SUCCESSFUL:
      return createUserReducer(state, action);
    case USER_UPDATE_FAILED:
    case USER_UPDATE_START:
    case USER_UPDATE_SUCCESSFUL:
      return createUserReducer(state, action);
    default:
      return state;
  }
};

export default userReducer;
