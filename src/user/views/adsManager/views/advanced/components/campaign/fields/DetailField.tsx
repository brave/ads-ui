import { Box, Divider, Typography } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import React from "react";
import { CardContainer } from "components/Card/CardContainer";
import { CampaignDateRange } from "components/Campaigns/CampaignDateRange";

export function DetailField(props: { isEdit: boolean }) {
  return (
    <CardContainer header="Campaign Details">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Campaigns are used to define your budgets and advertising objectives.
      </Typography>
      <FormikTextField name="name" label="Campaign Name" sx={{ mb: 3 }} />

      <CampaignDateRange isEdit={props.isEdit} />
    </CardContainer>
  );
}
