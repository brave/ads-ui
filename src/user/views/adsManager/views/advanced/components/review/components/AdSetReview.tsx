import {
  AdSetForm,
  Conversion,
  Creative,
  OS,
  Segment,
} from "@/user/views/adsManager/types";
import { FormikErrors } from "formik";
import { ConversionDisplay } from "@/components/Conversion/ConversionDisplay";
import { ReviewField } from "./ReviewField";
import { ReviewContainer } from "@/user/views/adsManager/views/advanced/components/review/components/ReviewContainer";
import { CreativeSpecificPreview } from "@/components/Creatives/CreativeSpecificPreview";
import { segmentNameWithNoDash } from "@/util/segment";

interface Props {
  idx: number;
  adSet: AdSetForm;
  errors?: string | FormikErrors<AdSetForm>;
}

export function AdSetReview({ adSet, idx, errors }: Props) {
  const included = adSet.creatives.filter((c) => c.included);
  const hasErrors = !!errors;
  if (typeof errors === "string") {
    return <>{errors}</>;
  }

  const adSetError = errors;

  const mapToString = (arr: Segment[] | OS[] | Creative[]) => {
    return arr.map((o) => segmentNameWithNoDash(o.name)).join(", ");
  };

  const segmentValue = (v: string) => {
    return v === "untargeted" ? "Let Brave pick categories for me." : v;
  };

  const adSetPos = `Ad Set ${idx + 1}`;
  return (
    <ReviewContainer name={adSetPos} path={`adSets?current=${idx}`}>
      <ReviewField
        caption={"Name"}
        value={adSet.name || adSetPos}
        error={hasErrors ? adSetError?.name : ""}
      />
      <ReviewField
        caption={"Audiences"}
        value={segmentValue(mapToString(adSet.segments))}
        error={hasErrors ? (adSetError?.segments as string) : ""}
      />
      <ReviewField
        caption={"Platforms"}
        value={mapToString(adSet.oses)}
        error={hasErrors ? (adSetError?.oses as string) : ""}
      />
      <ConversionDisplay
        conversion={adSet.conversion}
        convErrors={
          hasErrors ? (adSetError?.conversion as FormikErrors<Conversion>) : {}
        }
      />
      <CreativeSpecificPreview
        options={included}
        useSimpleHeader
        error={hasErrors ? (adSetError?.creatives as string) : ""}
      />
    </ReviewContainer>
  );
}
