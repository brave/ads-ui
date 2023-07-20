import { Divider, Stack, Typography } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import React from "react";
import { CountryPicker } from "components/Country/CountryPicker";

export function AddressField() {
  return (
    <React.Fragment>
      <Typography variant="subtitle1" gutterBottom width="100%">
        Second (and last!) we'll need info on your business. Once you are
        finished here, your account setup is complete.
      </Typography>

      <Divider sx={{ marginTop: 5, marginBottom: 5 }} />

      <FormikTextField
        name="address.street1"
        label="Street address"
        autoComplete="address-line1"
        margin="none"
        useTopLabel
      />

      <FormikTextField
        name="address.street2"
        label="Street address line 2"
        autoComplete="address-line2"
        margin="none"
        useTopLabel
      />

      <FormikTextField
        name="address.city"
        label="City / Town / Village / Locality"
        autoComplete="address-level2"
        margin="none"
        useTopLabel
      />

      <FormikTextField
        name="address.state"
        label="State / Province / Canton / Post Town"
        autoComplete="address-level1"
        margin="none"
        useTopLabel
      />

      <Stack direction="row" spacing={1}>
        <CountryPicker name="address.country" />

        <FormikTextField
          name="address.zipcode"
          label="Zip / Postal Code"
          placeholder="Zip / Postal Code"
          margin="none"
          autoComplete="postal-code"
          useTopLabel
        />
      </Stack>
    </React.Fragment>
  );
}
