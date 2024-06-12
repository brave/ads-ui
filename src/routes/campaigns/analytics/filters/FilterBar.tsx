import { Box } from "@mui/material";
import { TimeFilter } from "./TimeFilter";
import { PerformanceFilter } from "@/graphql-client/graphql";
import { Dispatch } from "react";
import { OsFilter } from "./OsFilter";
import { ReportMenu } from "@/user/reporting/ReportMenu";

export interface FilterProps {
  filters: PerformanceFilter;
  onChange: Dispatch<PerformanceFilter>;
  campaignId: string;
  hasVerifiedConversions: boolean;
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
      height={50}
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
