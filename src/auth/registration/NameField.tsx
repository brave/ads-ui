import { Box, Typography } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import { MarginedDivider } from "auth/registration/MarginedDivider";

export function NameField() {
  return (
    <Box flexGrow={1}>
      <Typography variant="subtitle1" gutterBottom>
        Thank you for choosing Brave&apos;s Ads Platform! To get your account
        set up, please start by providing your contact information below.
      </Typography>

      <MarginedDivider />

      <FormikTextField
        name="fullName"
        label="First and last name"
        autoComplete="given-name"
        margin="none"
        placeholder="Your first and last name"
        useTopLabel
      />

      <FormikTextField
        name="email"
        label="Email Address"
        type="email"
        autoComplete="email"
        margin="none"
        placeholder="Your email address"
        useTopLabel
      />

      <FormikTextField
        name="advertiser.name"
        label="Company name"
        margin="none"
        placeholder="The name of your business"
        useTopLabel
      />

      <FormikTextField
        required
        name="advertiser.url"
        label="Company URL"
        autoComplete="url"
        margin="none"
        placeholder="Where we can find you on the internet"
        useTopLabel
      />

      <FormikTextField
        required
        name="advertiser.phone"
        label="Company phone"
        autoComplete="tel"
        type="tel"
        margin="none"
        placeholder="Where we can reach you"
        useTopLabel
      />

      <FormikTextField
        required
        multiline
        minRows={3}
        maxRows={10}
        name="advertiser.description"
        label="Company overview"
        margin="none"
        placeholder="Describe your product or service"
        useTopLabel
      />
    </Box>
  );
}
