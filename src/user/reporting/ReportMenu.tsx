import { useState } from "react";
import { useDownloadCSV } from "@/user/reporting/csv.library";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  ListItemIcon,
  Menu,
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownloadIcon from "@mui/icons-material/Download";
import { Trans } from "@lingui/macro";

interface ReportMenuProps {
  hasVerifiedConversions: boolean;
  campaignId: string;
}
export const ReportMenu = ({
  campaignId,
  hasVerifiedConversions,
}: ReportMenuProps) => {
  const [dialogue, setDialogue] = useState(false);
  const [isError, setIsError] = useState(false);
  const set = (s: string) =>
    document.getElementById("private-key")?.setAttribute("value", s);
  const { download, loading, error } = useDownloadCSV({
    onComplete() {
      setAnchorEl(null);
      setDialogue(false);
    },
    onError() {
      setIsError(true);
      setDialogue(false);
    },
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menu = Boolean(anchorEl);
  return (
    <>
      <Button
        variant="contained"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={
          anchorEl === null ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )
        }
        disabled={loading}
        size="large"
        sx={{
          borderRadius: 1,
        }}
      >
        <Trans>Download Report</Trans>
      </Button>

      <Menu anchorEl={anchorEl} open={menu} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => download(campaignId, false)}
          disabled={loading}
        >
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
          <Trans>Performance Report</Trans>
        </MenuItem>
        {hasVerifiedConversions && (
          <MenuItem onClick={() => setDialogue(true)} disabled={loading}>
            <ListItemIcon>
              <DownloadIcon />
            </ListItemIcon>
            <Trans>Verified Conversions Report</Trans>
          </MenuItem>
        )}
      </Menu>

      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={() => setIsError(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setIsError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>

      <Dialog open={dialogue} onClose={() => setDialogue(false)}>
        <DialogTitle>
          <Trans>Decrypt Conversion Data?</Trans>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Trans>
              To protect user&rsquo;s privacy, verified ad conversion data is
              encrypted so that the identities of converted users remain
              anonymous to Brave. You can decrypt the conversion data in the CSV
              file by providing your private key here. If no key is provided,
              you will receive the encrypted conversion data. Your private key
              will never be sent to or stored on any Brave servers.
            </Trans>
          </DialogContentText>
          <TextField
            autoComplete="off"
            onChange={(e) => set(e.target.value)}
            autoFocus
            margin="normal"
            label={<Trans>Private Key</Trans>}
            fullWidth
            variant="standard"
          />
          <input type="hidden" id="private-key" />
          {loading && <LinearProgress />}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => setDialogue(false)}
            disabled={loading}
          >
            <Trans>Cancel</Trans>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              download(campaignId, true);
            }}
            disabled={loading}
          >
            <Trans>Export</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
