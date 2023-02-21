import { Box, Divider, Typography } from "@mui/material";
import { FormikTextField } from "../../../../../../../../form/FormikHelpers";
import { CampaignDateRange } from "../../../../../../../../components/Campaigns/CampaignDateRange";
import React from "react";

export function DetailField() {
  return (
    <Box>
      <Divider textAlign="left" sx={{ fontSize: "24px", mb: 1, mt: 2 }}>
        Campaign Details
      </Divider>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Campaigns are used to define your budgets and advertising objectives.
      </Typography>
      <FormikTextField name="name" label="Campaign Name" sx={{ mb: 3 }} />
    </Box>
  );
}
