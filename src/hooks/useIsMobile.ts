import { useMediaQuery, useTheme } from "@mui/material";

export const useIsMobile = () => {
  const muiTheme = useTheme();
  return useMediaQuery(muiTheme.breakpoints.down("md"));
};
