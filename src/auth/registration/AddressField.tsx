import { Stack, Typography } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import React from "react";
import { CountryPicker } from "components/Country/CountryPicker";

export function AddressField() {
  return (
    <React.Fragment>
      <Typography variant="body1" gutterBottom>
        We are excited to have the opportunity to work with you! The last bit we
        need is some address info for your organization. This will allow us to
        set up the necessary financial arrangements and ensure a seamless
        partnership.
      </Typography>

      <FormikTextField name="address.street1" label="Street address" />

      <FormikTextField name="address.street2" label="Street address line 2" />

      <Stack direction="row" spacing={1} mt={1} mb={2}>
        <FormikTextField name="address.city" label="City" margin="none" />

        <FormikTextField name="address.state" label="State" margin="none" />
      </Stack>

      <Stack direction="row" spacing={1} mt={2} mb={1}>
        <CountryPicker name="address.country" />

        <FormikTextField name="address.zipcode" label="ZipCode" margin="none" />
      </Stack>
    </React.Fragment>
  );
}
