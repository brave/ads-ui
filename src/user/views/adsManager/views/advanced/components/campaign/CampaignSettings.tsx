import { FormikTextField } from "form/FormikHelpers";
import { CardContainer } from "components/Card/CardContainer";
import { CampaignDateRange } from "components/Campaigns/CampaignDateRange";
import { LocationField } from "user/views/adsManager/views/advanced/components/campaign/fields/LocationField";
import { Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";

export function CampaignSettings(props: { isEdit: boolean }) {
  const { values } = useFormikContext<CampaignForm>();
  const isEdit = props.isEdit && values.state !== "draft";

  return (
    <>
      <CardContainer header="Campaign Settings">
        <Typography variant="body2" gutterBottom>
          Define when you want your campaign to run.
        </Typography>

        <FormikTextField name="name" label="Campaign Name" sx={{ mb: 1 }} />

        <CampaignDateRange isEdit={isEdit} />
      </CardContainer>

      {!isEdit && <LocationField />}
    </>
  );
}
