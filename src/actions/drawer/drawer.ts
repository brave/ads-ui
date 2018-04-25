
export const OPEN_DRAWER = "OPENDRAWER";
export const OpenDrawer = (payload: any) => ({
  payload,
  type: OPEN_DRAWER,
});

export const CLOSE_DRAWER = "CLOSEDRAWER";
export const CloseDrawer = (payload: any) => ({
  payload,
  type: CLOSE_DRAWER,
});

export const TOGGLE_DRAWER = "TOGGLEDRAWER";
export const ToggleDrawer = () => ({
  payload: null,
  type: TOGGLE_DRAWER,
});
