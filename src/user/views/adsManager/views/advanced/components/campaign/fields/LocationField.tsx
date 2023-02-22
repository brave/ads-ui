import { Box, Divider, Typography } from "@mui/material";
import { LocationPicker } from "../../../../../../../../components/Location/LocationPicker";
import React from "react";

export function LocationField() {
  return (
    <Box mb={2}>
      <Divider textAlign="left" sx={{ fontSize: "24px", mb: 1, mt: 2 }}>
        Location
      </Divider>
      <Typography variant="body2" sx={{ mb: 5 }}>
        Select the geographic regions where your ads will be shown.
      </Typography>
      <LocationPicker />
    </Box>
  );
}
