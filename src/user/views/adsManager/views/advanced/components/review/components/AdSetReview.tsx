import { AdSetForm, Creative, OS, Segment } from "../../../../../types";
import { FormikErrors } from "formik";
import { ConversionDisplay } from "components/Conversion/ConversionDisplay";
import { ReviewField } from "./ReviewField";
import { ReviewContainer } from "user/views/adsManager/views/advanced/components/review/components/ReviewContainer";
import { CampaignFormat } from "graphql/types";
import { CreativeSpecificPreview } from "components/Creatives/CreativeSpecificPreview";

interface Props {
  idx: number;
  adSet: AdSetForm;
  format: CampaignFormat;
  errors?: string | FormikErrors<AdSetForm>;
}

export function AdSetReview({ adSet, idx, errors }: Props) {
  const hasErrors = !!errors;
  if (typeof errors === "string") {
    return <>{errors}</>;
  }

  const adSetError = errors;

  const mapToString = (arr: Segment[] | OS[] | Creative[]) => {
    return arr.map((o) => o.name).join(", ");
  };

  const segmentValue = (v: string) => {
    return v === "untargeted" ? "Let Brave pick categories for me." : v;
  };

  return (
    <ReviewContainer name={`Ad Set ${idx + 1}`} path={`adSets?current=${idx}`}>
      <ReviewField
        caption="Name"
        value={adSet.name || `Ad Set ${idx + 1}`}
        error={hasErrors ? adSetError?.name : ""}
      />
      <ReviewField
        caption="Audiences"
        value={segmentValue(mapToString(adSet.segments))}
        error={hasErrors ? (adSetError?.segments as string) : ""}
      />
      <ReviewField
        caption="Platforms"
        value={mapToString(adSet.oses)}
        error={hasErrors ? (adSetError?.oses as string) : ""}
      />
      <ConversionDisplay
        conversions={adSet.conversions}
        convErrors={adSetError?.conversions}
      />
      {hasErrors ? (
        <ReviewField
          caption="Ads"
          value={mapToString(adSet.creatives)}
          error={hasErrors ? (adSetError?.creatives as string) : ""}
        />
      ) : (
        <CreativeSpecificPreview
          name={`adSets.${idx}.creatives`}
          useSimpleHeader
        />
      )}
    </ReviewContainer>
  );
}
