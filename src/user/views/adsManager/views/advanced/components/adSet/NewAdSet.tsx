import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { useAdvertiserCreatives } from "@/user/hooks/useAdvertiserCreatives";
import { CampaignForm, initialAdSet } from "@/user/views/adsManager/types";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  Box,
  Button,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FieldArray, FieldArrayRenderProps, useFormikContext } from "formik";
import { useRef } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

export function NewAdSet() {
  const { creatives } = useAdvertiserCreatives();
  const { trackMatomoEvent } = useTrackMatomoEvent();
  const history = useHistory();
  const { values } = useFormikContext<CampaignForm>();
  const params = new URLSearchParams(history.location.search);
  const selectedRef = useRef(0);
  selectedRef.current = Number(params.get("current") ?? 0);

  const initial = {
    ...initialAdSet,
    creatives,
  };

  return (
    <>
      <FieldArray name="adSets">
        {(helper: FieldArrayRenderProps) => (
          <Stack spacing={0.5}>
            {values.adSets.map((adSet, idx) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                key={`current-${idx}`}
              >
                <Link
                  component={RouterLink}
                  underline="none"
                  onClick={() => {
                    selectedRef.current = idx;
                  }}
                  to={`?current=${idx}`}
                  width="100%"
                  variant="overline"
                  color="secondary"
                  textAlign="left"
                  bgcolor={
                    selectedRef.current === idx
                      ? "rgba(248, 83, 43, 0.04)"
                      : "none"
                  }
                  replace
                >
                  {adSet.name || `Ad Set ${idx + 1}`}
                </Link>
                {idx > 0 && !adSet.id && (
                  <Tooltip title="Remove">
                    <IconButton
                      onClick={() => {
                        const newIdx = idx - 1;
                        selectedRef.current = newIdx;
                        history.replace(`?current=${newIdx}`);
                        helper.remove(idx);
                        trackMatomoEvent("adSet", "remove-new-ad-set");
                      }}
                    >
                      <RemoveCircleOutlineIcon fontSize="small" color="error" />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
            ))}
            {values.adSets.length <= 19 && (
              <Box
                width="100%"
                pb={0}
                pt={0}
                component={Button}
                onClick={() => {
                  trackMatomoEvent("adSet", "add-new-ad-set");
                  helper.push(initial);
                }}
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
