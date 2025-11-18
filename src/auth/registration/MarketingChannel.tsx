import { FormikSelect, FormikTextField } from "@/form/FormikHelpers";
import { useField } from "formik";

export function MarketingChannel(props: { name: string }) {
  const [, meta] = useField("advertiser.marketingChannel");

  return (
    <>
      <FormikSelect
        label="Where did you hear about Brave Ads"
        name={props.name}
        margin="dense"
        size="small"
        inlineError
        options={[
          {
            label: "While looking up alternatives to Google Ads",
            value: "google-ad-alternative",
          },
          {
            label: "At a marketing/media conference",
            value: "conference",
          },
          {
            label: "From an influential person I follow online",
            value: "influencer",
          },
          { label: "On a podcast I listen to", value: "podcast" },
          {
            label: "In a newsletter I subscribe to",
            value: "newsletter",
          },
          { label: "From a friend/colleague", value: "friend-referral" },
          { label: "In a blog post/news article", value: "blog-post" },
          {
            label: "In a post by Brave on LinkedIn",
            value: "brave-linkedin",
          },
          { label: "In a video on YouTube", value: "youtube" },
          {
            label: "From a Brave sales representative",
            value: "brave-sales-rep",
          },
          {
            label: "An ad from my Brave browser",
            value: "brave-browser-ad",
          },
          { label: "Other (please specify)", value: "other" },
        ]}
      />
      {meta.value === "other" && (
        <FormikTextField
          margin="dense"
          name="advertiser.other"
          label="Other source"
          size="small"
        />
      )}
    </>
  );
}
