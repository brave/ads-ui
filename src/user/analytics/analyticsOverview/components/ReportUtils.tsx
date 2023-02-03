import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import React, { useState } from "react";
import {downloadCSV} from "../lib/csv.library";
import {DateRangePicker} from "../../../../components/Date/DateRangePicker";

interface DownloaderProps {
  startDate: Date | undefined;
  endDate: Date;
  campaign: { id: string; name: string };
  onSetDate: (val: Date, type: "start" | "end") => void;
  auth: any;
}

export default function ReportUtils({
  startDate,
  endDate,
  campaign,
  onSetDate,
  auth,
}: DownloaderProps) {
  const [downloadingCSV, setDownloadingCSV] = useState(false);
  console.log(startDate);

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
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
          onClick={() =>
            downloadCSV(
              campaign.id,
              campaign.name,
              auth.accessToken,
              auth.id ?? "",
              false,
              setDownloadingCSV
            )
          }
        >
          Download Report
        </LoadingButton>
      </Box>
    </Box>
  );
}
