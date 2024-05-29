import BigNumber from "bignumber.js";
import { MetricDefinition } from "./metrics";
import _ from "lodash";
import { Skeleton, Typography } from "@mui/material";
import { format } from "@/user/library/format";

interface Props {
  metric: MetricDefinition;
  value: BigNumber | undefined | null;
}

export function RenderMetricValue({ metric, value }: Props) {
  if (_.isNil(value)) {
    return <Skeleton width={50} />;
  }

  // if (metric.isLikelyUnderestimate) {
  //   return (
  //     <Tooltip
  //       title="There are known current issues with this metric. It is very likely an underestimate. Please caveat it accordingly."
  //       arrow
  //       placement="left"
  //     >
  //       <Box display="flex" flexDirection="row" alignItems="center">
  //         <Typography marginRight={0.5}>
  //           {format(metric.type, value)}
  //         </Typography>
  //
  //         <ErrorOutlineOutlinedIcon fontSize="small" color="disabled" />
  //       </Box>
  //     </Tooltip>
  //   );
  // }

  return <Typography>{format(metric.type, value)}</Typography>;
}
