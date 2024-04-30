import { Box, CircularProgress } from "@mui/material";

export function FullScreenProgress() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignContent="center"
      height="100%"
      flexWrap="wrap"
    >
      <CircularProgress />
    </Box>
  );
}
