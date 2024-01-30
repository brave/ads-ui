import { Box, Typography } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import { MarginedDivider } from "auth/registration/MarginedDivider";
import { MarketingOptIn } from "auth/registration/MarketingOptIn";

export function NameField() {
  return (
    <Box flexGrow={1}>
      <Typography variant="subtitle1" gutterBottom>
        Use an email address that matches your company’s domain for faster
        approval times. (Ex: https://brave.com and ads@brave.com)
      </Typography>

      <MarginedDivider />

      <FormikTextField
        name="fullName"
        label="Full name"
        autoComplete="given-name"
      />

      <FormikTextField
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
      />

      <FormikTextField name="advertiser.name" label="Company name" />

      <FormikTextField
        name="advertiser.url"
        label="Company website"
        autoComplete="url"
      />

      <FormikTextField
        multiline
        minRows={3}
        maxRows={10}
        name="advertiser.description"
        label="Tell us why your interested in Brave Ads"
      />

      <MarketingOptIn />
    </Box>
  );
}
