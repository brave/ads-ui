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
    <Box width={{ xs: 350, sm: 500 }}>
      <FormikTextField
        name="user.fullName"
        label={_(msg`Full name`)}
        margin="dense"
        autoComplete="given-name"
        size="small"
        inlineError
      />

      <FormikTextField
        name="user.email"
        label={_(msg`Work email`)}
        type="email"
        margin="dense"
        autoComplete="email"
        size="small"
        inlineError
      />

      <FormikTextField
        name="domain"
        label={_(msg`Domain to advertise`)}
        autoComplete="url"
        margin="dense"
        size="small"
        inlineError
      />

      <CountryPicker
        name="country"
        label={_(msg`Primary region of business`)}
        filter={["US", "GB", "DE", "FR", "CA", "IN"]}
      />

      <MarketingChannel name="advertiser.marketingChannel" />

      <MarketingOptIn />
    </Box>
  );
}
