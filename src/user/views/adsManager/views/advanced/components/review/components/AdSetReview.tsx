import { Card, Divider, List, Typography } from "@mui/material";
import { CustomListItemText } from "../../../../../../../../components/List/CustomListItemText";
import React from "react";
import { AdSetForm, OS, Segment } from "../../../../../types";
import { FormikErrors } from "formik";
import { AdReview } from "./AdReview";
import ConversionDisplay from "../../../../../../../../components/Conversion/ConversionDisplay";

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
    return v === "untargeted" ? "Let Brave determine best audience." : v;
  };

  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Ad Set {idx + 1}</Typography>
      <List>
        <CustomListItemText
          primary="Audiences"
          secondary={segmentValue(mapToString(adSet.segments))}
          error={hasErrors ? (adSetError?.segments as string) : ""}
        />
        <CustomListItemText
          primary="Platforms"
          secondary={mapToString(adSet.oses)}
          error={hasErrors ? (adSetError?.oses as string) : ""}
        />
        <ConversionDisplay
          conversions={adSet.conversions}
          hasErrors={hasErrors}
          convErrors={adSetError?.conversions}
        />
      </List>

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
    </Card>
  );
}
