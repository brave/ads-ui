import { Box, Stack } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import { CountryPicker } from "components/Country/CountryPicker";

export function AddressField() {
  return (
    <Box flexGrow={1}>
      <FormikTextField
        name="address.street1"
        label="Street address"
        autoComplete="address-line1"
        margin="dense"
      />

      <FormikTextField
        name="address.street2"
        label="Street address line 2"
        autoComplete="address-line2"
        margin="dense"
      />

      <FormikTextField
        name="address.city"
        label="City / Town / Village / Locality"
        autoComplete="address-level2"
        margin="dense"
      />

      <FormikTextField
        name="address.state"
        label="State / Province / Canton / Post Town"
        autoComplete="address-level1"
        margin="dense"
      />

      <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 1 }}>
        <CountryPicker name="address.country" />

        <FormikTextField
          name="address.zipcode"
          label="Zip / Postal Code"
          autoComplete="postal-code"
          margin="dense"
        />
      </Stack>
    </Box>
  );
}
