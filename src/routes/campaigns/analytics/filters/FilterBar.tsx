import { CampaignFormat, PerformanceFilter } from "@/graphql-client/graphql";
import { ReportMenu } from "@/user/reporting/ReportMenu";
import { Box } from "@mui/material";
import { Dispatch } from "react";
import { OsFilter } from "./OsFilter";
import { TimeFilter } from "./TimeFilter";

export interface FilterProps {
  filters: PerformanceFilter;
  onChange: Dispatch<PerformanceFilter>;
  campaignId: string;
}

interface FilterBarProps extends FilterProps {
  format: CampaignFormat;
}

export function FilterBar({
  filters,
  onChange,
  campaignId,
  format,
}: FilterBarProps) {
  return (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      flexDirection="row"
      paddingX={1}
      gap={1}
      height={50}
    >
      <TimeFilter
        filters={filters}
        onChange={onChange}
        campaignId={campaignId}
      />
      <OsFilter filters={filters} onChange={onChange} campaignId={campaignId} />
      <ReportMenu campaignId={campaignId} format={format} />
    </Box>
  );
}
