import {Button, Card} from "@mui/material";
import React from "react";
import {ObjectiveField} from "./fields/ObjectiveField";
import {DetailField} from "./fields/DetailField";
import {DateField} from "./fields/DateField";
import {LocationField} from "./fields/LocationField";

interface Props {
  onNext: () => void;
}

export function CampaignFields({ onNext }: Props) {
  return (
    <Card sx={{p: 2, mt: 2}}>
      {/*<ObjectiveField />*/}

      <DetailField />

      <DateField />

      <LocationField />

      <Button variant="contained" size="large" onClick={onNext}>
        Next
      </Button>
    </Card>
  )
}
