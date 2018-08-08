import {
  IUserAction,
  IUserPayload,
  USER_CREATE_FAILED,
  USER_CREATE_START,
  USER_CREATE_SUCCESSFUL,
} from "../../actions";
import { IUserState } from "./user.interface";

export const createUserReducer = (state: IUserState, action: IUserAction): IUserState => {
  switch (action.type) {
    case USER_CREATE_START:
      return {
        ...state,
      };
    case USER_CREATE_SUCCESSFUL:
      return {
        users: [
          action.payload as IUserPayload,
          ...state.users,
        ],
      };
    case USER_CREATE_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
