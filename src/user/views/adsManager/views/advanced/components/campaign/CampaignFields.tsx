import { Card } from "@mui/material";
import React from "react";
import {ObjectiveField} from "./fields/ObjectiveField";
import {DetailField} from "./fields/DetailField";
import {DateField} from "./fields/DateField";
import {LocationField} from "./fields/LocationField";

export function CampaignFields() {
  return (
    <Card sx={{p: 2, mt: 2}}>
      <ObjectiveField />

      <DetailField />

      <DateField />

      <LocationField />
    </Card>
  )
}
