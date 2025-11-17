import { FormikTextField } from "@/form/FormikHelpers";
import { MarketingOptIn } from "@/auth/registration/MarketingOptIn";
import { MarketingChannel } from "@/auth/registration/MarketingChannel";
import { Box } from "@mui/material";
import { VerticalPicker } from "@/auth/registration/VerticalPicker";

export function BrowserForm() {
  return (
    <Box width={{ xs: 350, sm: 500 }}>
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
        label="Email"
        type="email"
        margin="dense"
        autoComplete="email"
        size="small"
        inlineError
      />

      <FormikTextField
        name="advertiser.name"
        label="Business name"
        margin="dense"
        size="small"
        inlineError
      />

      <FormikTextField
        name="advertiser.url"
        label="Business website"
        autoComplete="url"
        margin="dense"
        size="small"
        inlineError
      />

      <VerticalPicker name="advertiser.vertical" />

      <MarketingChannel name="advertiser.marketingChannel" />

      <FormikTextField
        multiline
        minRows={3}
        maxRows={10}
        margin="dense"
        name="advertiser.description"
        label="Tell us why you're interested in Brave Ads"
        size="small"
        inlineError
      />

      <MarketingOptIn />
    </Box>
  );
}
