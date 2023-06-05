import { Divider } from "@mui/material";
import { AdSetForm, OS, Segment } from "../../../../../types";
import { FormikErrors } from "formik";
import { AdReview } from "./AdReview";
import { ConversionDisplay } from "components/Conversion/ConversionDisplay";
import { CardContainer } from "components/Card/CardContainer";
import { ReviewField } from "./ReviewField";

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

  const mapToString = (arr: Segment[] | OS[]) => {
    return arr.map((o) => o.name).join(", ");
  };

  const segmentValue = (v: string) => {
    return v === "untargeted" ? "Let Brave determine the best audience." : v;
  };

  return (
    <CardContainer header={`Ad Set ${idx + 1}`}>
      <ReviewField
        caption="Name"
        value={adSet.name}
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

      {adSet.creatives.map((ad, adIdx) => (
        <>
          <Divider sx={{ mt: 2, mb: 2 }} />

          <AdReview
            ad={ad}
            adIdx={adIdx}
            error={hasErrors ? adSetError?.creatives?.[adIdx] : ""}
          />
        </>
      ))}
    </CardContainer>
  );
}
