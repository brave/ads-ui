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
import { CampaignFormat } from "@/graphql-client/graphql";
import { CreativeSpecificPreview } from "@/components/Creatives/CreativeSpecificPreview";
import { segmentNameWithNoDash } from "@/util/segment";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

interface Props {
  idx: number;
  adSet: AdSetForm;
  format: CampaignFormat;
  errors?: string | FormikErrors<AdSetForm>;
}

export function AdSetReview({ adSet, idx, errors, format }: Props) {
  const included = adSet.creatives.filter((c) => c.included);
  const { _ } = useLingui();
  const hasErrors = !!errors;
  if (typeof errors === "string") {
    return <>{errors}</>;
  }

  const adSetError = errors;

  const mapToString = (arr: Segment[] | OS[] | Creative[]) => {
    return arr.map((o) => segmentNameWithNoDash(o.name)).join(", ");
  };

  const segmentValue = (v: string) => {
    return v === "untargeted" ? _(msg`Let Brave pick categories for me.`) : v;
  };

  console.log(adSetError);
  const adSetPos = `${_(msg`Ad Set`)} ${idx + 1}`;
  return (
    <ReviewContainer name={adSetPos} path={`adSets?current=${idx}`}>
      <ReviewField
        caption={msg`Name`}
        value={adSet.name || adSetPos}
        error={hasErrors ? adSetError?.name : ""}
      />
      {format !== CampaignFormat.NewsDisplayAd && (
        <ReviewField
          caption={msg`Audiences`}
          value={segmentValue(mapToString(adSet.segments))}
          error={hasErrors ? (adSetError?.segments as string) : ""}
        />
      )}
      <ReviewField
        caption={msg`Platforms`}
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
