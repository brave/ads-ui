import { Box, Divider, Typography } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";

export function NameField() {
  return (
    <Box flexGrow={1}>
      <Typography variant="subtitle1" gutterBottom>
        Thank you for choosing Brave&rsquo;s Ads Platform! Let&rsquo;s get you
        setup with your account. First, we&rsquo;ll need your info.
      </Typography>

      <Divider sx={{ marginTop: 5, marginBottom: 5 }} />

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
        label="Business Name"
        margin="none"
        placeholder="The name of your business"
        useTopLabel
      />

      <FormikTextField
        required
        name="advertiser.url"
        label="Business URL"
        autoComplete="url"
        margin="none"
        placeholder="Where we can find you on the internet"
        useTopLabel
      />

      <FormikTextField
        required
        name="advertiser.phone"
        label="Business phone"
        autoComplete="tel"
        type="tel"
        margin="none"
        placeholder="Where we can reach you"
        useTopLabel
      />
    </Box>
  );
}
