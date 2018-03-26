export const OPEN_SNACKBAR = "OPENSNACKBAR";
export const OpenSnackBar = (payload: any) => ({
  payload,
  type: OPEN_SNACKBAR,
});

export const CLOSE_SNACKBAR = "CLOSESNACKBAR";
export const CloseSnackBar = (payload: any) => ({
  payload,
  type: CLOSE_SNACKBAR,
});
