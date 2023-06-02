import { CampaignForm } from "../../../../../types";
import { FormikErrors } from "formik";
import { CardContainer } from "components/Card/CardContainer";
import { ReviewField } from "./ReviewField";

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

  const billing = (v: string) => {
    return v === "cpm" ? "Impressions (CPM)" : "Clicks (CPC)";
  };

  return (
    <CardContainer header="Campaign">
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
        value={`$${values.budget} ${values.currency}`}
        error={errors.budget}
      />
      <ReviewField
        caption="Pricing Type"
        value={billing(values.billingType)}
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
    </CardContainer>
  );
}
