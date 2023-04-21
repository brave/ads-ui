import { FieldArray, useFormikContext } from "formik";
import { Box, Card, Divider, IconButton } from "@mui/material";
import React from "react";
import { DetailsField } from "./fields/DetailsField";
import { PickerFields } from "./fields/PickerFields";
import { ConversionField } from "./fields/ConversionField";
import ClearIcon from "@mui/icons-material/Clear";
import { CampaignForm, initialAdSet } from "../../../../types";

interface Props {
  tabValue: number;
  onRemove: () => void;
  onCreate: () => void;
  isEdit: boolean;
}

export function AdSetFields({ tabValue, onRemove, onCreate, isEdit }: Props) {
  const { values } = useFormikContext<CampaignForm>();
  const index = tabValue - 1;

  return (
    <FieldArray name="adSets">
      {({ remove, push }) => (
        <Card sx={{ mt: 2, p: 2 }}>
          <Box>
            {!isEdit && (
              <>
                <Box display="flex" flexDirection="row" alignItems="center">
                  <Divider
                    textAlign="left"
                    sx={{ fontSize: "24px", mb: 1, flexGrow: 1 }}
                  >
                    Ad Set {index + 1} Details
                  </Divider>
                  {index > 0 && !isEdit && (
                    <IconButton
                      onClick={() => {
                        onRemove();
                        remove(index);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  )}
                </Box>

                <DetailsField
                  index={index}
                  onCreate={() => {
                    onCreate();
                    push(initialAdSet);
                  }}
                  showCreateNew={
                    index === values.adSets.length - 1 &&
                    values.adSets.length <= 5
                  }
                />
              </>
            )}

            <PickerFields index={index} />

            {!isEdit && <ConversionField index={index} />}
          </Box>
        </Card>
      )}
    </FieldArray>
  );
}
