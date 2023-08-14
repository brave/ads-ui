import { AdSetForm, Creative, OS, Segment } from "../../../../../types";
import { FormikErrors } from "formik";
import { ConversionDisplay } from "components/Conversion/ConversionDisplay";
import { ReviewField } from "./ReviewField";
import { ReviewContainer } from "user/views/adsManager/views/advanced/components/review/components/ReviewContainer";

interface Props {
  idx: number;
  adSet: AdSetForm;
  errors?: string | FormikErrors<AdSetForm>;
}

export function AdSetReview({ adSet, idx, errors }: Props) {
  if (typeof errors === "string") {
    return <>{errors}</>;
  }

  const hasErrors = !!errors;
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
      <ReviewField
        caption="Ads"
        value={mapToString(adSet.creatives)}
        error={hasErrors ? (adSetError?.creatives as string) : ""}
      />
    </ReviewContainer>
  );
}
