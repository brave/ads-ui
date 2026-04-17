import {
  CampaignFormat,
  CampaignSummaryFragment,
} from "@/graphql-client/graphql";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Button, DialogContent, Divider, Popover } from "@mui/material";
import { useState } from "react";
import { downloadCSV } from "./csv.library";
import {
  defaultFieldsForFormat,
  ReportFields,
  V3ReportFields,
} from "./ReportFields";

export type ReportMenu_Campaign = Pick<
  CampaignSummaryFragment,
  "format" | "name" | "id"
>;

interface Props {
  campaign: ReportMenu_Campaign;
}

function oldReportPath(campaign: ReportMenu_Campaign): string | null {
  if (campaign.format === CampaignFormat.NtpSi) {
    return null;
  }

  return `/v1/report/campaign/csv/${campaign.id}`;
}

export function ReportMenu({ campaign }: Props) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [v3fields, setV3fields] = useState<V3ReportFields>(
    defaultFieldsForFormat(campaign.format),
  );

  const open = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = (reportServerPath: string) => () => {
    setIsDownloading(true);

    downloadCSV({
      reportServerPath,
      downloadFilename: `${campaign.name}.csv`,
    })
      .catch((e: unknown) => alert(`Unexpected error during download: ${e}`))
      .finally(() => {
        setIsDownloading(false);
      });

    handleMenuClose();
  };

  const handleV3Download = () => {
    const metricsParam = v3fields.metrics.join(",");
    const dimsParam = v3fields.dimensions.join(",");

    const path = `/v3/report/campaign/csv/${campaign.id}?metrics=${metricsParam}&dimensions=${dimsParam}`;
    handleDownload(path)();
  };

  const legacyPath = oldReportPath(campaign);

  return (
    <>
      <Button
        variant="contained"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
        disabled={isDownloading}
        size="medium"
        sx={{ borderRadius: 1 }}
      >
        Download Report
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleMenuClose}
        key={campaign.id}
      >
        <DialogContent sx={{ width: 870 }}>
          {legacyPath && (
            <>
              <Divider textAlign="left" sx={{ my: 1 }}>
                Performance Report (old format)
              </Divider>
              <Box display="flex" gap={1}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload(legacyPath)}
                >
                  Download
                </Button>
              </Box>
            </>
          )}
          <Divider textAlign="left" sx={{ my: 1 }}>
            Custom Report
          </Divider>
          <Box>
            <ReportFields
              format={campaign.format}
              value={v3fields}
              onValueChanged={setV3fields}
            />
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={handleV3Download}
            >
              Download
            </Button>
          </Box>
        </DialogContent>
      </Popover>
    </>
  );
}
