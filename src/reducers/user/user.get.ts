import {
  GETALL_USER_FAILED,
  GETALL_USER_START,
  GETALL_USER_SUCCESSFUL,
  IUserAction,
  IUserPayload,
} from "../../actions";
import { IUserState } from "./user.interface";

export const getUserReducer = (state: IUserState, action: IUserAction): IUserState => {
  switch (action.type) {
    case GETALL_USER_START:
      return {
        ...state,
      };
    case GETALL_USER_SUCCESSFUL:
      return {
        users: action.payload as IUserPayload[],
      };
    case GETALL_USER_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
