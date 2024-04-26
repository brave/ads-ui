import { Button, Stack } from "@mui/material";
import { useContext } from "react";
import { DraftContext } from "@/state/context";
import { useFormikContext } from "formik";
import { CampaignForm } from "@/user/views/adsManager/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link as RouterLink } from "react-router-dom";
import { Trans } from "@lingui/macro";

export function ActionButtons() {
  const { values } = useFormikContext<CampaignForm>();
  const { setDrafts } = useContext(DraftContext);

  return (
    <Stack mt={3} spacing={2} mr={1}>
      {values.draftId !== undefined && (
        <Button
          startIcon={<RemoveIcon />}
          component={RouterLink}
          size="small"
          color="error"
          to="/user/main/campaign"
          onClick={() => {
            localStorage.removeItem(values.draftId!);
            setDrafts();
          }}
        >
          <Trans>Discard campaign</Trans>
        </Button>
      )}
      <Button
        size="small"
        component={RouterLink}
        to="/user/main/campaign"
        startIcon={<ArrowBackIcon />}
      >
        <Trans>Return to dashboard</Trans>
      </Button>
    </Stack>
  );
}
