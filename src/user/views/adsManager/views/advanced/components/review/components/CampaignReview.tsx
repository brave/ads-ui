import { Card, List, Typography } from "@mui/material";
import { CustomListItemText } from "../../../../../../../../components/List/CustomListItemText";
import React from "react";
import { CampaignForm } from "../../../../../types";
import { FormikErrors } from "formik";

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
    <Card sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">Campaign</Typography>
      <List>
        <CustomListItemText
          primary="Name"
          secondary={values.name}
          error={errors.name}
        />
        <CustomListItemText
          primary="Start Time"
          secondary={formatDate(values.startAt)}
          error={errors.startAt}
        />
        <CustomListItemText
          primary="End Time"
          secondary={formatDate(values.endAt)}
          error={errors.endAt}
        />
        <CustomListItemText
          primary="Lifetime Budget"
          secondary={`$${values.budget} ${values.currency}`}
          error={errors.budget}
        />
        <CustomListItemText
          primary="Pricing Type"
          secondary={billing(values.billingType)}
          error={errors.billingType}
        />
        <CustomListItemText
          primary="Price"
          secondary={`$${values.price}`}
          error={errors.price}
        />
        <CustomListItemText
          primary="Locations"
          secondary={values.geoTargets.map((t) => t.name).join(", ")}
          error={errors.geoTargets as string}
        />
      </List>
    </Card>
  );
}
