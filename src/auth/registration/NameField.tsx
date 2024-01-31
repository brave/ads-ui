import { Box } from "@mui/material";
import { FormikSelect, FormikTextField } from "form/FormikHelpers";
import { MarketingOptIn } from "auth/registration/MarketingOptIn";
import { useField } from "formik";

export function NameField() {
  const [, meta] = useField("advertiser.marketingChannel");

  return (
    <Box flexGrow={1}>
      <FormikTextField
        name="fullName"
        label="Full name"
        margin="dense"
        autoComplete="given-name"
      />

      <FormikTextField
        name="email"
        label="Email"
        type="email"
        margin="dense"
        autoComplete="email"
      />

      <FormikSelect
        label="Where did you hear about Brave Ads"
        name="advertiser.marketingChannel"
        margin="dense"
        options={[
          {
            label: "While looking up alternatives to Google Ads",
            value: "google-ad-alternative",
          },
          { label: "At a marketing/media conference", value: "conference" },
          {
            label: "From an influential person I follow online",
            value: "influencer",
          },
          { label: "On a podcast I listen to", value: "podcast" },
          { label: "In a newsletter I subscribe to", value: "newsletter" },
          { label: "From a friend/colleague", value: "friend-referral" },
          { label: "In a blog post/news article", value: "blog-post" },
          { label: "In a post by Brave on LinkedIn", value: "brave-linkedin" },
          { label: "In a video on YouTube", value: "youtube" },
          { label: "Other (please specify)", value: "other" },
        ]}
      />
      {meta.value === "other" && (
        <FormikTextField
          margin="dense"
          name="advertiser.other"
          label="Other source"
        />
      )}

      <FormikTextField
        multiline
        minRows={3}
        maxRows={10}
        margin="dense"
        name="advertiser.description"
        label="Tell us why your interested in Brave Ads"
      />

      <MarketingOptIn />
    </Box>
  );
}
