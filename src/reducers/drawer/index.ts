import { CLOSE_DRAWER, OPEN_DRAWER, TOGGLE_DRAWER } from "../../actions";

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
    case TOGGLE_DRAWER:
      return {
        open: !state.open,
      };
    default:
      return state;
  }
};

export default drawerReducer;
