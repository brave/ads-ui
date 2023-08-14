import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { downloadCSV } from "../lib/csv.library";
import { DateRangePicker } from "components/Date/DateRangePicker";
import { useUser } from "auth/hooks/queries/useUser";
import { DashboardButton } from "components/Button/DashboardButton";
import { CampaignFormat } from "graphql/types";

interface DownloaderProps {
  startDate: Date | undefined;
  endDate: Date;
  campaign: { id: string; name: string; format?: CampaignFormat };
  onSetDate: (val: Date, type: "start" | "end") => void;
}

export default function ReportUtils({
  startDate,
  endDate,
  campaign,
  onSetDate,
}: DownloaderProps) {
  const [downloadingCSV, setDownloadingCSV] = useState(false);
  const { userId } = useUser();

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
      >
        {startDate && (
          <DateRangePicker
            from={startDate}
            to={endDate}
            onFromChange={(d) => onSetDate(d, "start")}
            onToChange={(d) => onSetDate(d, "end")}
          ></DateRangePicker>
        )}

        <LoadingButton
          variant="contained"
          loading={downloadingCSV}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          disabled={campaign.format === CampaignFormat.NtpSi}
          onClick={() =>
            downloadCSV(
              campaign.id,
              campaign.name,
              userId ?? "",
              false,
              setDownloadingCSV,
            )
          }
        >
          Download Report
        </LoadingButton>
      </Box>
    </Box>
  );
}
