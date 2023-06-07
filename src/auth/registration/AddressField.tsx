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

      <FormikTextField
        name="address.street1"
        label="Street address"
        autoComplete="address-line1"
      />

      <FormikTextField
        name="address.street2"
        label="Street address line 2"
        autoComplete="address-line2"
      />

      <Stack direction="row" spacing={1} mt={1} mb={2}>
        <FormikTextField
          name="address.state"
          label="State / Province / Canton / Post Town"
          margin="none"
          autoComplete="address-level1"
        />

        <FormikTextField
          name="address.city"
          label="City / Town / Village / Locality"
          margin="none"
          autoComplete="address-level2"
        />
      </Stack>

      <Stack direction="row" spacing={1} mt={2} mb={2}>
        <CountryPicker name="address.country" />

        <FormikTextField
          name="address.zipcode"
          label="Zip / Postal Code"
          margin="none"
          autoComplete="postal-code"
        />
      </Stack>
    </React.Fragment>
  );
}
