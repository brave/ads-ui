import { Box, Button, Card, Stack } from "@mui/material";
import React from "react";
import { DetailField } from "./fields/DetailField";
import { BudgetField } from "./fields/BudgetField";
import { LocationField } from "./fields/LocationField";
import { CampaignDateRange } from "components/Campaigns/CampaignDateRange";
import { IAdvertiser } from "auth/context/auth.interface";

interface Props {
  onNext: () => void;
  isEdit: boolean;
}

export function CampaignFields({ onNext, isEdit }: Props) {
  return (
    <Box>
      <DetailField isEdit={isEdit} />

      <BudgetField isEdit={isEdit} />

      {!isEdit && <LocationField />}

      <div>
        <Button variant="contained" size="large" onClick={onNext}>
          Next
        </Button>
      </div>
    </Box>
  );
}
