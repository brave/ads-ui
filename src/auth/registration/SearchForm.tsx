import { Box } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import { MarketingOptIn } from "auth/registration/MarketingOptIn";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { MarketingChannel } from "auth/registration/MarketingChannel";
import { CountryPicker } from "components/Country/CountryPicker";

export function SearchForm() {
  const { _ } = useLingui();

  return (
    <Box maxWidth={500} display="flex" flexDirection="column">
      <FormikTextField
        name="fullName"
        label={_(msg`Full name`)}
        margin="dense"
        autoComplete="given-name"
        size="small"
      />

      <FormikTextField
        name="email"
        label={_(msg`Work email`)}
        type="email"
        margin="dense"
        autoComplete="email"
        size="small"
      />

      <FormikTextField
        name="advertiser.url"
        label={_(msg`Domain to advertise`)}
        autoComplete="url"
        margin="dense"
        size="small"
      />

      <CountryPicker
        name="country"
        label={_(msg`Primary region of business`)}
        filter={["US", "UK", "DE", "FR", "CA", "IN"]}
      />

      <MarketingChannel name="advertiser.marketingChannel" />

      <MarketingOptIn />
    </Box>
  );
}
