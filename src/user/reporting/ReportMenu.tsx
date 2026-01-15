import { useState } from "react";
import { useDownloadCSV } from "@/user/reporting/csv.library";
import {
  Alert,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownloadIcon from "@mui/icons-material/Download";

interface ReportMenuProps {
  campaignId: string;
}
export const ReportMenu = ({ campaignId }: ReportMenuProps) => {
  const [isError, setIsError] = useState(false);
  const { download, loading, error } = useDownloadCSV({
    onComplete() {
      setAnchorEl(null);
    },
    onError() {
      setIsError(true);
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
        size="medium"
        sx={{
          borderRadius: 1,
        }}
      >
        Download Report
      </Button>

      <Menu anchorEl={anchorEl} open={menu} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => download(campaignId)} disabled={loading}>
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
          Performance Report
        </MenuItem>
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
    </>
  );
};
