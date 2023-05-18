import { Box, Link, Stack, Typography } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import React, { useState } from "react";
import { FormikValues, useFormikContext } from "formik";
import { Status } from "components/Campaigns/Status";
import { CampaignForm } from "user/views/adsManager/types";

interface Props {
  index: number;
  onCreate: () => void;
  showCreateNew: boolean;
}

export function DetailsField({ index, onCreate, showCreateNew }: Props) {
  const { values } = useFormikContext<CampaignForm>();
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row">
          <Typography variant="body2" sx={{ mr: 1 }}>
            Ad sets are used to define your audience.
          </Typography>

          {showCreateNew && (
            <Link
              underline="none"
              variant="body2"
              onClick={onCreate}
              sx={{ cursor: "pointer" }}
            >
              Create new Ad Set +
            </Link>
          )}
        </Stack>

        <Status state={values.adSets[index].state} />
      </Box>
      <FormikTextField name={`adSets.${index}.name`} label="Ad Set Name" />
    </>
  );
}
