import { Box, Skeleton } from "@mui/material";
import { renderMonetaryAmount } from "@/components/Datagrid/renderers";
import { StatsMetric } from "@/user/analytics/analyticsOverview/types";
import { toLocaleString } from "@/util/bignumber";

export const renderStatsCell = (
  loading: boolean,
  type: keyof StatsMetric,
  val?: StatsMetric,
  currency?: string,
) => {
  if (loading) {
    return <Skeleton />;
  }

  if (!val || !val[type]) {
    return <Box>-</Box>;
  }

  if (val[type].lte(0) || val[type].isNaN()) {
    return <Box>-</Box>;
  }

  switch (type) {
    case "ctr":
    case "convRate":
    case "dismissRate":
    case "landingRate":
    case "visitRate":
      return <Box>{toLocaleString(val[type])}%</Box>;
    case "spend":
    case "cpa":
      return renderMonetaryAmount(val.spend, currency ?? "USD");
    default:
      return <Box>{toLocaleString(val[type])}</Box>;
  }
};
