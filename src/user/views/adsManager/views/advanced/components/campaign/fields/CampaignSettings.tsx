import { FormikTextField } from "form/FormikHelpers";
import React from "react";
import { CardContainer } from "components/Card/CardContainer";
import { CampaignDateRange } from "components/Campaigns/CampaignDateRange";
import { LocationField } from "user/views/adsManager/views/advanced/components/campaign/fields/LocationField";

export function CampaignSettings(props: { isEdit: boolean }) {
  return (
    <>
      <CardContainer header="Campaign Settings">
        <FormikTextField name="name" label="Campaign Name" sx={{ mb: 1 }} />

        <CampaignDateRange isEdit={props.isEdit} />
      </CardContainer>

      {!props.isEdit && <LocationField />}
    </>
  );
}
