import { Box, Divider, Stack, Typography } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import React from "react";
import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";
import { Status } from "components/Campaigns/Status";

export function DetailField() {
  const { values } = useFormikContext<CampaignForm>();
  return (
    <Box>
      <Divider textAlign="left" sx={{ fontSize: "24px", mb: 1, mt: 2 }}>
        Campaign Details
      </Divider>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="body2" sx={{ mb: 2 }}>
          Campaigns are used to define your budgets and advertising objectives.
        </Typography>
        <Status state={values.state} />
      </Stack>
      <FormikTextField name="name" label="Campaign Name" sx={{ mb: 3 }} />
    </Box>
  );
}
