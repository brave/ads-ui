import {
  Alert,
  Box,
  Button,
  ListItemIcon,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { DateRangePicker } from "components/Date/DateRangePicker";
import { DashboardButton } from "components/Button/DashboardButton";
import { CampaignFormat } from "graphql/types";
import _ from "lodash";
import { useDownloadCSV } from "user/analytics/analyticsOverview/lib/csv.library";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownloadIcon from "@mui/icons-material/Download";

interface DownloaderProps {
  startDate: Date | undefined;
  endDate: Date;
  campaign: {
    id: string;
    name: string;
    format?: CampaignFormat;
    adSets?:
      | {
          conversions?: { type: string; extractExternalId: boolean }[] | null;
        }[]
      | null;
  };
  onSetDate: (val: Date, type: "start" | "end") => void;
}

export default function ReportUtils({
  startDate,
  endDate,
  campaign,
  onSetDate,
}: DownloaderProps) {
  const conversions = _.flatMap(campaign.adSets ?? [], "conversions");
  const maybeHasVerifiedConversions = _.some(
    conversions ?? [],
    (c) => c.extractExternalId,
  );

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <DashboardButton />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        marginLeft="auto"
        gap="5px"
      >
        {startDate && (
          <DateRangePicker
            from={startDate}
            to={endDate}
            onFromChange={(d) => onSetDate(d, "start")}
            onToChange={(d) => onSetDate(d, "end")}
          />
        )}

        {campaign.format !== CampaignFormat.NtpSi && (
          <ReportMenu
            hasVerifiedConversions={maybeHasVerifiedConversions}
            campaignId={campaign.id}
          />
        )}
      </Box>
    </Box>
  );
}

interface ReportMenuProps {
  hasVerifiedConversions: boolean;
  campaignId: string;
}
const ReportMenu = ({
  campaignId,
  hasVerifiedConversions,
}: ReportMenuProps) => {
  const [isError, setIsError] = useState(false);
  const { download, loading, error } = useDownloadCSV({
    onComplete() {
      setAnchorEl(null);
    },
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menu = Boolean(anchorEl);

  useEffect(() => {
    if (error !== undefined) {
      setIsError(true);
    }
  }, [error]);

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
      >
        Download Report
      </Button>

      <Menu anchorEl={anchorEl} open={menu} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => download(campaignId, false)}
          disabled={loading}
        >
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
          Performance Report
        </MenuItem>
        ,
        {hasVerifiedConversions && (
          <MenuItem
            onClick={() => download(campaignId, true)}
            disabled={loading}
          >
            <ListItemIcon>
              <DownloadIcon />
            </ListItemIcon>
            Verified Conversions Report
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
    </>
  );
};
