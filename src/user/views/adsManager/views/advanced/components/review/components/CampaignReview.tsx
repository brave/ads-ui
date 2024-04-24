import { CampaignForm } from "../../../../../types";
import { FormikErrors } from "formik";
import { ReviewField } from "./ReviewField";
import { ReviewContainer } from "@/user/views/adsManager/views/advanced/components/review/components/ReviewContainer";
import { uiLabelsForBillingType } from "@/util/billingType";
import { uiLabelsForCampaignFormat } from "@/util/campaign";
import { msg, Trans } from "@lingui/macro";

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
    <ReviewContainer name={<Trans>Campaign</Trans>} path="settings">
      <ReviewField
        caption={msg`Name`}
        value={values.name}
        error={errors.name}
      />

      <ReviewField
        caption={msg`Format`}
        value={uiLabelsForCampaignFormat(values.format)}
        error={errors.format}
      />

      <ReviewField
        caption={msg`Start Time`}
        value={formatDate(values.startAt)}
        error={errors.startAt}
      />
      <ReviewField
        caption={msg`End Time`}
        value={formatDate(values.endAt)}
        error={errors.endAt}
      />
      <ReviewField
        caption={msg`Lifetime Budget`}
        value={`$${values.budget} ${values.currency}`}
        error={errors.budget}
      />
      <ReviewField
        caption={msg`Pricing Type`}
        value={uiLabelsForBillingType(values.billingType).longLabel}
        error={errors.billingType}
      />
      <ReviewField
        caption={msg`Price`}
        value={`$${values.price}`}
        error={errors.price}
      />
      <ReviewField
        caption={msg`Locations`}
        value={values.geoTargets.map((t) => t.name).join(", ")}
        error={errors.geoTargets as string}
      />
    </ReviewContainer>
  );
}
