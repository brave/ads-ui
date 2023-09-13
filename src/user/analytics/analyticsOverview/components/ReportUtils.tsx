import { Box } from "@mui/material";
import { DateRangePicker } from "components/Date/DateRangePicker";
import { DashboardButton } from "components/Button/DashboardButton";
import { CampaignFormat } from "graphql/types";
import _ from "lodash";
import { ReportMenu } from "user/reporting/ReportMenu";

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
