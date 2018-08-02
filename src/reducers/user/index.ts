import { GETALL_USER_FAILED, GETALL_USER_START, GETALL_USER_SUCCESSFUL, IUserAction } from "../../actions";
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
    default:
      return state;
  }
};

export default userReducer;
