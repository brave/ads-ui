import { Box, Link, Stack, Typography } from "@mui/material";
import { FormikCheckbox, FormikTextField } from "form/FormikHelpers";
import { CountryPicker } from "components/Country/CountryPicker";
import { MarginedDivider } from "auth/registration/MarginedDivider";
import { Link as RouterLink } from "react-router-dom";

export function AddressField() {
  return (
    <Box flexGrow={1}>
      <Typography variant="subtitle1" gutterBottom width="100%">
        Finally, we need your company&apos;s address information. Once you have
        entered it below, you can submit the form for approval.
      </Typography>

      <MarginedDivider />

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

      <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 2, md: 1 }}>
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

      <MarketingOptIn />
    </Box>
  );
}

function MarketingOptIn() {
  const PolicyLink = (props: { title: string; to: string }) => (
    <Link
      to={props.to}
      underline="none"
      variant="inherit"
      rel="noreferrer"
      target="_blank"
      component={RouterLink}
    >
      {props.title}
    </Link>
  );

  return (
    <Stack mt={1}>
      <FormikCheckbox
        name="marketingOptIn"
        label="I would like to receive marketing emails about new features and promotions from Brave Ads"
      />
      <Typography variant="body2">
        Please see our{" "}
        <PolicyLink
          title="Advertiser Privacy Policy"
          to="https://brave.com/advertiser-privacy/"
        />{" "}
        and{" "}
        <PolicyLink
          title="Terms of Service"
          to="https://basicattentiontoken.org/advertiser-terms-of-service/"
        />{" "}
        applicable to Brave Ads
      </Typography>
    </Stack>
  );
}
