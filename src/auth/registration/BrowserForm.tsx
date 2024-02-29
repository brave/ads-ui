import { FormikTextField } from "form/FormikHelpers";
import { MarketingOptIn } from "auth/registration/MarketingOptIn";
import { useField } from "formik";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { MarketingChannel } from "auth/registration/MarketingChannel";
import { Box } from "@mui/material";

export function BrowserForm() {
  const [, meta] = useField("advertiser.marketingChannel");
  const { _ } = useLingui();

  return (
    <Box width={{ xs: 350, sm: 500 }}>
      <FormikTextField
        name="user.fullName"
        label={_(msg`Full name`)}
        margin="dense"
        autoComplete="given-name"
        size="small"
      />

      <FormikTextField
        name="user.email"
        label={_(msg`Email`)}
        type="email"
        margin="dense"
        autoComplete="email"
        size="small"
      />

      <FormikTextField
        name="advertiser.name"
        label={_(msg`Business name`)}
        margin="dense"
        size="small"
      />

      <FormikTextField
        name="advertiser.url"
        label={_(msg`Business website`)}
        autoComplete="url"
        margin="dense"
        size="small"
      />

      <MarketingChannel name="advertiser.marketingChannel" />

      {meta.value === "other" && (
        <FormikTextField
          margin="dense"
          name="advertiser.other"
          label={_(msg`Other source`)}
          size="small"
        />
      )}

      <FormikTextField
        multiline
        minRows={3}
        maxRows={10}
        margin="dense"
        name="advertiser.description"
        label={_(msg`Tell us why you're interested in Brave Ads`)}
        size="small"
      />

      <MarketingOptIn />
    </Box>
  );
}
