import {Box, Button, Link, Typography} from "@mui/material";
import {FormikRadioControl, FormikTextField} from "../../../../../../../../form/FormikHelpers";
import React from "react";

interface Props {
  index: number
  onCreate: () => void;
  showCreateNew: boolean;
}

export function DetailsField({ index, onCreate, showCreateNew }: Props) {
  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography variant="body2" sx={{ mr: 1 }}>
          Ad sets are used to define your audience and how budget is spent.
        </Typography>

        {showCreateNew && (
          <Link underline="none" variant="body2" onClick={onCreate} sx={{ cursor: "pointer" }}>
            Create new Ad Set +
          </Link>
        )}
      </Box>
      <FormikTextField name={`adSets.${index}.name`} label="AdSet Name"/>
      <FormikRadioControl
        name="billingType"
        label="Pricing Type"
        options={[
          {value: "cpm", label: "CPM (Impressions)"},
          {value: "cpc", label: "CPC (Clicks)"},
        ]}
      />
      <FormikTextField
        name={`adSets.${index}.amount`}
        label="Price"
        type="number"
      />
    </>
  )
}
