import { useStickyState } from "@/hooks/useStickyState";
import {
  Alert,
  AlertTitle,
  Button,
  Collapse,
  IconButton,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Trans } from "@lingui/macro";
import CloseIcon from "@mui/icons-material/Close";

export const ChangeReportingAlert = (props: { id: string }) => {
  const [showAlert, setShowAlert] = useStickyState("showReportingAlert", true);

  return (
    <Collapse in={showAlert}>
      <Alert
        severity="info"
        sx={{ mb: 2, display: "flex", alignItems: "center" }}
        action={
          <Stack spacing={2} direction="row">
            <Button
              color="inherit"
              component={RouterLink}
              to={`/user/main/campaign/${props.id}`}
              variant="outlined"
            >
              <Trans>Revert</Trans>
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShowAlert(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        }
      >
        <AlertTitle>
          <Trans>We've updated our reporting view</Trans>
        </AlertTitle>
        <Trans>
          Toggle between various metrics using the switches provided. For deeper
          insights, click the buttons to access various breakdowns. If you
          prefer the previous view, simply click the "revert" button to switch
          back.
        </Trans>
      </Alert>
    </Collapse>
  );
};
