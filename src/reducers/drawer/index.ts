import { CLOSE_DRAWER, OPEN_DRAWER } from "../../actions";

const drawerReducer = (
  state = {
    open: false,
  },
  action: any,
) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return {
        open: true,
      };
    case CLOSE_DRAWER:
      return {
        open: false,
      };
    default:
      return state;
  }
};

export default drawerReducer;
