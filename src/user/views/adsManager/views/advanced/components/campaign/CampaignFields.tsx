import { Button, Card } from "@mui/material";
import React from "react";
import { DetailField } from "./fields/DetailField";
import { BudgetField } from "./fields/BudgetField";
import { LocationField } from "./fields/LocationField";
import { CampaignDateRange } from "components/Campaigns/CampaignDateRange";
import { IAdvertiser } from "auth/context/auth.interface";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";

interface Props {
  onNext: () => void;
  isEdit: boolean;
}

export function CampaignFields({ onNext, isEdit }: Props) {
  const { advertiser } = useAdvertiser();
  return (
    <Card sx={{ p: 2, mt: 2 }}>
      <DetailField />

      <CampaignDateRange isEdit={isEdit} />

      <BudgetField
        canSetPrice={advertiser.selfServiceSetPrice}
        isEdit={isEdit}
      />

      {!isEdit && <LocationField />}

      <Button variant="contained" size="large" onClick={onNext} sx={{ mt: 2 }}>
        Next
      </Button>
    </Card>
  );
}
