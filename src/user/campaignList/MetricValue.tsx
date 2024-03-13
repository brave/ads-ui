import { Box, Skeleton } from "@mui/material";
import _ from "lodash";
import { format } from "user/library/format";

interface Props {
  loading?: boolean;
  metricType: "number" | "rate" | "usd";
  value: any;
}

export function MetricValue({ loading = false, metricType, value }: Props) {
  return (
    <Box>
      {loading ? (
        <Skeleton width={75} />
      ) : _.isNil(value) ? (
        "-"
      ) : (
        format(metricType, value)
      )}
    </Box>
  );
}
