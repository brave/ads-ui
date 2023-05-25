import { Button, Card } from "@mui/material";
import React from "react";
import { DetailField } from "./fields/DetailField";
import { BudgetField } from "./fields/BudgetField";
import { LocationField } from "./fields/LocationField";
import { CampaignDateRange } from "components/Campaigns/CampaignDateRange";

interface Props {
  onNext: () => void;
  isEdit: boolean;
}

export function CampaignFields({ onNext, isEdit }: Props) {
  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <DetailField />

      <CampaignDateRange isEdit={isEdit} />

      <BudgetField isEdit={isEdit} />

      {!isEdit && <LocationField />}

      <Button variant="contained" size="large" onClick={onNext} sx={{ mt: 2 }}>
        Next
      </Button>
    </Card>
  );
}
