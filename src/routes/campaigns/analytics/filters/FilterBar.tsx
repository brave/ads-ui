import { Box } from "@mui/material";
import { BreakdownSelector } from "./BreakdownSelector";
import { TimeFilter } from "./TimeFilter";
import { PerformanceFilter } from "@/graphql-client/graphql";
import { Dispatch } from "react";
import { Dayjs } from "dayjs";
import { OsFilter } from "./OsFilter";

export interface FilterProps {
  filters: PerformanceFilter;
  onChange: Dispatch<PerformanceFilter>;
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
      <BreakdownSelector />
      <TimeFilter {...props} />
      <OsFilter {...props} />
    </Box>
  );
}
