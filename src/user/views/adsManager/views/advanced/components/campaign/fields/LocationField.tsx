import { Typography } from "@mui/material";
import { LocationPicker } from "components/Location/LocationPicker";
import React from "react";
import { CardContainer } from "components/Card/CardContainer";

export function LocationField() {
  return (
    <CardContainer header="Location">
      <Typography variant="body2" gutterBottom>
        Select the geographic regions where your ads will be shown.
      </Typography>
      <LocationPicker />
    </CardContainer>
  );
}
