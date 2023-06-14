import { FieldArray, useFormikContext } from "formik";
import {
  Box,
  BoxProps,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { CampaignForm, initialAdSet } from "user/views/adsManager/types";
import React, { PropsWithChildren, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export function NewAdSet() {
  const { values } = useFormikContext<CampaignForm>();
  const [selected, setSelected] = useState(0);

  return (
    <FieldArray name={`adSets`}>
      {({ remove, push }) => (
        <Stack spacing={0.5}>
          {values.adSets.map((adSet, idx) => (
            <Stack direction="row">
              <BoxButton
                justifyContent="space-between"
                onClick={() => {
                  console.log(idx);
                  setSelected(idx);
                }}
                bgcolor={selected === idx ? "rgba(248, 83, 43, 0.04)" : "none"}
              >
                <Typography variant="overline" color="secondary">
                  {adSet.name || `Ad Set ${idx + 1}`}
                </Typography>
              </BoxButton>
              {idx > 0 && (
                <Tooltip title="Remove">
                  <IconButton
                    onClick={() => {
                      setSelected(idx - 1);
                      remove(idx);
                    }}
                  >
                    <RemoveCircleOutlineIcon fontSize="small" color="error" />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          ))}
          {values.adSets.length <= 4 && (
            <BoxButton
              onClick={() => push(initialAdSet)}
              border="1px solid #ededed"
            >
              <Typography variant="overline" color="primary">
                New
              </Typography>
            </BoxButton>
          )}
        </Stack>
      )}
    </FieldArray>
  );
}

const BoxButton = (props: PropsWithChildren & BoxProps) => {
  return (
    <Box {...props} component={Button} width="100%" pb={0} pt={0}>
      {props.children}
    </Box>
  );
};
