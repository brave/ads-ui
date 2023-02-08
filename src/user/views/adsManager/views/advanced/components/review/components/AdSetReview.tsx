import {Card, Divider, List, Typography} from "@mui/material";
import {CustomListItemText} from "../../../../../../../../components/List/CustomListItemText";
import React from "react";
import {AdSetForm, Conversion, OS, Segment} from "../../../../../types";
import {FormikErrors} from "formik";
import {AdReview} from "./AdReview";
import _ from "lodash";

interface Props {
  idx: number;
  adSet: AdSetForm;
  errors?: string | FormikErrors<AdSetForm>;
}

export function AdSetReview({ adSet, idx, errors }: Props) {
  const hasErrors = !!errors;
  const adSetError = errors as FormikErrors<AdSetForm>;

  const mapToString = (arr: Segment[] | OS[]) => {
    return arr.map((o) => o.name).join(", ");
  }

  const segmentValue = (v: string) => {
    return v === "untargeted" ? "Let Brave determine best audience." : v;
  }

  const conversionValue = (v: Conversion[]) => {
    if (v.length === 0) {
      return "No conversion metric set.";
    }

    const conversion = v[0];
    return (
      <div>
        { conversion.type } <br /> { conversion.observationWindow } <br /> { conversion.urlPattern }
      </div>
    )
  }

  const billing = (v: string) => {
    return v === "cpm" ? "Impressions" : "Clicks";
  }

  return (
    <Card sx={{p: 2, mt: 2}}>
      <Typography variant="h6">
        Ad Set {idx + 1}
      </Typography>
      <List>
        <CustomListItemText
          primary="Pricing Type"
          secondary={billing(adSet.billingType)}
          error={hasErrors ? adSetError.billingType : ""}
        />
        <CustomListItemText
          primary="Price"
          secondary={`$${adSet.price}`}
          error={hasErrors ? adSetError.price : ""}
        />
        <CustomListItemText
          primary="Audiences"
          secondary={segmentValue(mapToString(adSet.segments))}
          error={hasErrors ? adSetError.segments as string : ""}
        />
        <CustomListItemText
          primary="Platforms"
          secondary={mapToString(adSet.oses)}
          error={hasErrors ? adSetError.oses as string : ""}
        />
        <CustomListItemText
          primary="Conversion"
          secondary={conversionValue(adSet.conversions)}
          error={hasErrors ? adSetError.conversions?.[0] as string : ""}
        />
      </List>

      {adSet.creatives.map((ad, adIdx) => (
        <>
          <Divider sx={{mt: 2, mb: 2}}/>

          <AdReview
            ad={ad}
            adIdx={adIdx}
            error={hasErrors ? adSetError.creatives?.[adIdx] : ""}
          />
        </>
      ))}

    </Card>
  )
}
