import { CampaignFormat } from "@/graphql-client/graphql";
import {
  isSupportedReportFormat,
  type SupportedReportFormat,
  useDownloadCSV,
} from "@/user/reporting/csv.library";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Alert,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { useState } from "react";

interface ReportMenuProps {
  campaignId: string;
  format: CampaignFormat;
}
export const ReportMenu = ({ campaignId, format }: ReportMenuProps) => {
  if (!isSupportedReportFormat(format)) {
    return null;
  }

  return <ReportMenuInner campaignId={campaignId} format={format} />;
};

function ReportMenuInner({
  campaignId,
  format,
}: {
  campaignId: string;
  format: SupportedReportFormat;
}) {
  const [isError, setIsError] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { download, loading, error } = useDownloadCSV({
    format,
    onComplete() {
      setAnchorEl(null);
    },
    onError() {
      setIsError(true);
    },
  });

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
}
