import { Box, Link, Stack, Typography } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import React from "react";
import { useFormikContext } from "formik";
import { Status } from "components/Campaigns/Status";
import { CampaignForm } from "user/views/adsManager/types";

interface Props {
  index: number;
  onCreate: () => void;
  isEdit: boolean;
}

export function DetailsField({ index, onCreate, isEdit }: Props) {
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

          {!isEdit && values.adSets.length < 5 && (
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

        <Status state={isEdit ? values.adSets[index].state : values.state} />
      </Box>
      <FormikTextField name={`adSets.${index}.name`} label="Ad Set Name" />
    </>
  );
}
