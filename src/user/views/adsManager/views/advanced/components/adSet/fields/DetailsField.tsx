import {Divider, Typography} from "@mui/material";
import {FormikRadioControl, FormikTextField} from "../../../../../../../../form/FormikHelpers";
import React from "react";

interface Props {
  index: number
}

export function DetailsField({ index }: Props) {
  return (
    <>
      <Divider textAlign="left" sx={{fontSize: "24px", mb: 1}}>
        Ad Set Details
      </Divider>
      <Typography variant="body2" sx={{mb: 2}}>
        Ad sets are used to define your audience and how budget is spent
      </Typography>
      <FormikTextField name={`adSets.${index}.name`} label="AdSet Name"/>
      <FormikRadioControl
        name="billingType"
        label="Pricing Type"
        options={[
          {value: "cpm", label: "CPM (Impressions)"},
          {value: "cpc", label: "CPC (Clicks)"},
        ]}
      />
    </>
  )
}
