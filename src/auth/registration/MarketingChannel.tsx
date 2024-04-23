import { FormikSelect, FormikTextField } from "@/form/FormikHelpers";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useField } from "formik";

export function MarketingChannel(props: { name: string }) {
  const [, meta] = useField("advertiser.marketingChannel");
  const { _ } = useLingui();

  return (
    <>
      <FormikSelect
        label={_(msg`Where did you hear about Brave Ads`)}
        name={props.name}
        margin="dense"
        size="small"
        inlineError
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
          { label: _(msg`From a friend/colleague`), value: "friend-referral" },
          { label: _(msg`In a blog post/news article`), value: "blog-post" },
          {
            label: _(msg`In a post by Brave on LinkedIn`),
            value: "brave-linkedin",
          },
          { label: _(msg`In a video on YouTube`), value: "youtube" },
          {
            label: _(msg`From a Brave sales representative`),
            value: "brave-sales-rep",
          },
          {
            label: _(msg`An ad from my Brave browser`),
            value: "brave-browser-ad",
          },
          { label: _(msg`Other (please specify)`), value: "other" },
        ]}
      />
      {meta.value === "other" && (
        <FormikTextField
          margin="dense"
          name="advertiser.other"
          label={_(msg`Other source`)}
          size="small"
        />
      )}
    </>
  );
}
