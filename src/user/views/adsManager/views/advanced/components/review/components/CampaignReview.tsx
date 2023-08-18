import { CampaignForm } from "../../../../../types";
import { FormikErrors } from "formik";
import { ReviewField } from "./ReviewField";
import { ReviewContainer } from "user/views/adsManager/views/advanced/components/review/components/ReviewContainer";
import { uiLabelsForBillingType } from "util/billingType";

interface Props {
  values: CampaignForm;
  errors: FormikErrors<CampaignForm>;
}

export function CampaignReview({ values, errors }: Props) {
  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <ReviewContainer name="Campaign" path="settings">
      <ReviewField caption="Name" value={values.name} error={errors.name} />

      <ReviewField
        caption="Start Time"
        value={formatDate(values.startAt)}
        error={errors.startAt}
      />
      <ReviewField
        caption="End Time"
        value={formatDate(values.endAt)}
        error={errors.endAt}
      />
      <ReviewField
        caption="Lifetime Budget"
        value={`$${values.budget} USD`}
        error={errors.budget}
      />
      <ReviewField
        caption="Pricing Type"
        value={uiLabelsForBillingType(values.billingType).longLabel}
        error={errors.billingType}
      />
      <ReviewField
        caption="Price"
        value={`$${values.price}`}
        error={errors.price}
      />
      <ReviewField
        caption="Locations"
        value={values.geoTargets.map((t) => t.name).join(", ")}
        error={errors.geoTargets as string}
      />
    </ReviewContainer>
  );
}
