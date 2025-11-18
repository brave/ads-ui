import BigNumber from "bignumber.js";
import { MetricDefinition } from "./metrics";
import _ from "lodash";
import { Box, Skeleton, Tooltip, Typography } from "@mui/material";
import { format } from "@/user/library/format";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

interface Props {
  metric: MetricDefinition;
  value: BigNumber | undefined | null;
}

export function RenderMetricValue({ metric, value }: Props) {
  if (_.isNil(value)) {
    return <Skeleton width={50} />;
  }

  if (metric.isLikelyUnderestimate) {
    return (
      <Tooltip
        title={"The current value for this metric may be an underestimate."}
        arrow
        placement="left"
      >
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography marginRight={0.5}>
            {format(metric.type, value)}
          </Typography>

          <ErrorOutlineOutlinedIcon fontSize="small" color="disabled" />
        </Box>
      </Tooltip>
    );
  }

  return <Typography>{format(metric.type, value)}</Typography>;
}
