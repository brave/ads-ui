import { Box } from "@mui/material";
import { TimeFilter } from "./TimeFilter";
import { PerformanceFilter } from "@/graphql-client/graphql";
import { Dispatch } from "react";
import { OsFilter } from "./OsFilter";
import { ReportMenu } from "@/user/reporting/ReportMenu";
import { Dayjs } from "dayjs";

export interface FilterProps {
  filters: PerformanceFilter;
  onChange: Dispatch<PerformanceFilter>;
  campaignId: string;
  hasVerifiedConversions: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
}

export function FilterBar(props: FilterProps) {
  return (
    <Box
      display="flex"
      justifyContent="start"
      alignItems="center"
      flexDirection="row"
      paddingX={1}
      gap={1}
    >
      <TimeFilter {...props} />
      <OsFilter {...props} />
      <ReportMenu
        {...props}
        hasVerifiedConversions={props.hasVerifiedConversions}
      />
    </Box>
  );
}
