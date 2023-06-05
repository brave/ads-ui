import { Box, IconButton, Link, Stack, Typography } from "@mui/material";
import { FormikTextField } from "form/FormikHelpers";
import React from "react";
import { CardContainer } from "components/Card/CardContainer";
import { FieldArray, useFormikContext } from "formik";
import { CampaignForm, initialAdSet } from "user/views/adsManager/types";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

interface Props {
  index: number;
  onCreate: () => void;
  onRemove: () => void;
  isEdit: boolean;
}

export function DetailsField({ index, onCreate, onRemove, isEdit }: Props) {
  const { values } = useFormikContext<CampaignForm>();

  return (
    <FieldArray name="adSets">
      {({ remove, push }) => (
        <CardContainer header={`Ad Set ${index + 1} Details`}>
          <Stack direction="row" justifyContent="space-between">
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ mr: 1 }}>
                Ad sets are used to define your audience.
              </Typography>

              {!isEdit && values.adSets.length < 5 && (
                <Link
                  underline="none"
                  variant="body2"
                  onClick={() => {
                    onCreate();
                    push(initialAdSet);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  Create new Ad Set +
                </Link>
              )}
            </Box>

            {index > 0 && !isEdit && (
              <IconButton
                onClick={() => {
                  onRemove();
                  remove(index);
                }}
              >
                <RemoveCircleOutlineIcon fontSize="medium" color="error" />
              </IconButton>
            )}
          </Stack>
          <FormikTextField name={`adSets.${index}.name`} label="Ad Set Name" />
        </CardContainer>
      )}
    </FieldArray>
  );
}
