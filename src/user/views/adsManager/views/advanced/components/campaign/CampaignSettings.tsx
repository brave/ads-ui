import { FormikTextField } from "form/FormikHelpers";
import React from "react";
import { CardContainer } from "components/Card/CardContainer";
import { CampaignDateRange } from "components/Campaigns/CampaignDateRange";
import { LocationField } from "user/views/adsManager/views/advanced/components/campaign/fields/LocationField";
import { Typography } from "@mui/material";

export function CampaignSettings(props: { isEdit: boolean }) {
  return (
    <>
      <CardContainer header="Campaign Settings">
        <Typography variant="body2" gutterBottom>
          Define when you want your campaign to run.
        </Typography>

        <FormikTextField name="name" label="Campaign Name" sx={{ mb: 1 }} />

        <CampaignDateRange isEdit={props.isEdit} />
      </CardContainer>

      {!props.isEdit && <LocationField />}
    </>
  );
}
