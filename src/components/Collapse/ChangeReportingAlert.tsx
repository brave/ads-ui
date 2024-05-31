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
          Toggle metric displays using the switches on the right. View different
          breakdowns using the tabs on the left. Use the top buttons to filter
          data. Click "revert" for the previous reporting screen.
        </Trans>
      </Alert>
    </Collapse>
  );
};
