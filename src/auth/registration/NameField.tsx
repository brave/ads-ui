import { Stack, Typography } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import React from "react";

export function NameField() {
  return (
    <React.Fragment>
      <Typography variant="body1" gutterBottom>
        Thank you for choosing Brave's Ads Platform! To complete your
        registration, we need some information in order to provide you with a
        great advertising experience. First, we'll start with the basics.
      </Typography>

      <Stack direction="row" spacing={1} mb={1} mt={2}>
        <FormikTextField
          required
          name="firstName"
          label="First Name"
          margin="none"
          autoComplete="given-name"
        />

        <FormikTextField
          required
          name="lastName"
          label="Last Name"
          margin="none"
          autoComplete="family-name"
        />
      </Stack>

      <FormikTextField
        required
        name="email"
        label="Email Address"
        type="email"
        autoComplete="email"
      />
    </React.Fragment>
  );
}
