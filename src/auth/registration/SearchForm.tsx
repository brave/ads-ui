import { Box } from "@mui/material";
import { FormikTextField } from "@/form/FormikHelpers";
import { MarketingOptIn } from "@/auth/registration/MarketingOptIn";
import { MarketingChannel } from "@/auth/registration/MarketingChannel";
import { CountryPicker } from "@/components/Country/CountryPicker";

export function SearchForm() {
  return (
    <Box width={375} p={1}>
      <FormikTextField
        name="user.fullName"
        label="Full name"
        margin="dense"
        autoComplete="given-name"
        size="small"
        inlineError
      />

      <FormikTextField
        name="user.email"
        label="Work email"
        type="email"
        margin="dense"
        autoComplete="email"
        size="small"
        inlineError
      />

      <FormikTextField
        name="domain"
        label="Domain to advertise"
        autoComplete="url"
        margin="dense"
        size="small"
        inlineError
      />

      <CountryPicker
        name="country"
        label="Primary region of business"
        filter={["US", "GB", "DE", "FR", "CA", "IN"]}
      />

      <MarketingChannel name="advertiser.marketingChannel" />

      <MarketingOptIn />
    </Box>
  );
}
