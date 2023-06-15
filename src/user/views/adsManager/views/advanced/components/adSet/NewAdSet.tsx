import { FieldArray, useFormikContext } from "formik";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { CampaignForm, initialAdSet } from "user/views/adsManager/types";
import React, { useRef } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export function NewAdSet(props: { isEdit: boolean }) {
  const history = useHistory();
  const { values } = useFormikContext<CampaignForm>();
  const params = new URLSearchParams(history.location.search);
  const selected = useRef(0);
  const current = Number(params.get("current") ?? 0);
  selected.current = current;

  return (
    <>
      <FieldArray name="adSets">
        {({ remove, push }) => (
          <Stack spacing={0.5}>
            {values.adSets.map((adSet, idx) => (
              <Stack direction="row" justifyContent="space-between">
                <Link
                  component={RouterLink}
                  underline="none"
                  onClick={() => (selected.current = idx)}
                  to={`?current=${idx}`}
                  width="100%"
                  variant="overline"
                  color="secondary"
                  textAlign="left"
                  bgcolor={
                    selected.current === idx
                      ? "rgba(248, 83, 43, 0.04)"
                      : "none"
                  }
                  replace
                >
                  <span style={{ marginLeft: "10px" }}>
                    {adSet.name || `Ad Set ${idx + 1}`}
                  </span>
                </Link>
                {idx > 0 && !props.isEdit && (
                  <Tooltip title="Remove">
                    <IconButton
                      onClick={() => {
                        const newIdx = idx - 1;
                        selected.current = newIdx;
                        history.replace(`?current=${newIdx}`);
                        remove(idx);
                      }}
                    >
                      <RemoveCircleOutlineIcon fontSize="small" color="error" />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            ))}
            {values.adSets.length <= 4 && !props.isEdit && (
              <Box
                width="100%"
                pb={0}
                pt={0}
                component={Button}
                onClick={() => push(initialAdSet)}
                border="1px solid #ededed"
              >
                <Typography variant="overline" color="primary">
                  New
                </Typography>
              </Box>
            )}
          </Stack>
        )}
      </FieldArray>
    </>
  );
}
