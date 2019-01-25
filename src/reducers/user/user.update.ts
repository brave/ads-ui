import _ from "lodash";

import {
  IUserAction,
  IUserPayload,
  USER_UPDATE_FAILED,
  USER_UPDATE_START,
  USER_UPDATE_SUCCESSFUL,
} from "../../actions";
import { IUserState } from "./user.interface";

export const updateUserReducer = (state: IUserState, action: IUserAction): IUserState => {
  switch (action.type) {
    case USER_UPDATE_START:
      return {
        ...state,
      };
    case USER_UPDATE_SUCCESSFUL:
      const users = _.filter(state.users, (item) => {
        return item.id !== (action.payload as IUserPayload).id;
      });
      users.unshift(action.payload as IUserPayload);
      return {
        users,
      };
    case USER_UPDATE_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
