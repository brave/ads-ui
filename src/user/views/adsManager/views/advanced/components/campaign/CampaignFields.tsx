import { Button, Card } from "@mui/material";
import React from "react";
import { DetailField } from "./fields/DetailField";
import { BudgetField } from "./fields/BudgetField";
import { LocationField } from "./fields/LocationField";
import { CampaignDateRange } from "components/Campaigns/CampaignDateRange";
import { IAdvertiser } from "auth/context/auth.interface";

interface Props {
  onNext: () => void;
  isEdit: boolean;
  advertiser: IAdvertiser;
}

export function CampaignFields({ onNext, isEdit, advertiser }: Props) {
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
