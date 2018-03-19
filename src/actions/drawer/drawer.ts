
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
