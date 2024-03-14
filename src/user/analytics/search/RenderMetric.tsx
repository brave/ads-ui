import BigNumber from "bignumber.js";
import { MetricType } from "./metrics";
import _ from "lodash";
import { Skeleton, Typography } from "@mui/material";
import { format } from "user/library/format";

interface Props {
  type: MetricType;
  value: BigNumber | undefined | null;
}

export function RenderMetric({ type, value }: Props) {
  if (_.isNil(value)) {
    return <Skeleton width={50} />;
  }

  return <Typography>{format(type, value)}</Typography>;
}
