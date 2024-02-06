import { Box } from "@mui/material";
import { FormikSelect, FormikTextField } from "form/FormikHelpers";
import { MarketingOptIn } from "auth/registration/MarketingOptIn";
import { useField } from "formik";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export function NameField() {
  const [, meta] = useField("advertiser.marketingChannel");
  const { _ } = useLingui();

  return (
    <Box flexGrow={1}>
      <FormikTextField
        name="fullName"
        label={_(msg`Full name`)}
        margin="dense"
        autoComplete="given-name"
      />

      <FormikTextField
        name="email"
        label={_(msg`Email`)}
        type="email"
        margin="dense"
        autoComplete="email"
      />

      <FormikTextField
        name="advertiser.name"
        label={_(msg`Business name`)}
        margin="dense"
      />

      <FormikTextField
        name="advertiser.url"
        label={_(msg`Business website`)}
        autoComplete="url"
        margin="dense"
      />

      <FormikSelect
        label={_(msg`Where did you hear about Brave Ads`)}
        name="advertiser.marketingChannel"
        margin="dense"
        options={[
          {
            label: _(msg`While looking up alternatives to Google Ads`),
            value: "google-ad-alternative",
          },
          {
            label: _(msg`At a marketing/media conference`),
            value: "conference",
          },
          {
            label: _(msg`From an influential person I follow online`),
            value: "influencer",
          },
          { label: _(msg`On a podcast I listen to`), value: "podcast" },
          {
            label: _(msg`In a newsletter I subscribe to`),
            value: "newsletter",
          },
          { label: _(msg`"From a friend/colleague`), value: "friend-referral" },
          { label: _(msg`In a blog post/news article`), value: "blog-post" },
          {
            label: _(msg`In a post by Brave on LinkedIn`),
            value: "brave-linkedin",
          },
          { label: _(msg`In a video on YouTube`), value: "youtube" },
          { label: _(msg`Other (please specify)`), value: "other" },
        ]}
      />
      {meta.value === "other" && (
        <FormikTextField
          margin="dense"
          name="advertiser.other"
          label={_(msg`Other source`)}
        />
      )}

      <FormikTextField
        multiline
        minRows={3}
        maxRows={10}
        margin="dense"
        name="advertiser.description"
        label={_(msg`Tell us why you're interested in Brave Ads`)}
      />

      <MarketingOptIn />
    </Box>
  );
}
