import { CLOSE_SNACKBAR, OPEN_SNACKBAR } from "../../actions";

const snackBarReducer = (
  state = {
    message: "",
    open: false,
  },
  action: any
) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return {
        message: action.payload,
        open: true,
      };
    case CLOSE_SNACKBAR:
      return {
        message: "",
        open: false,
      };
    default:
      return state;
  }
};

export default snackBarReducer;
