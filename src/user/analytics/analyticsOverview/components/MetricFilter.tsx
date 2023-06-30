import MetricSelect from "user/analytics/analyticsOverview/components/MetricSelect";
import { Text } from "components/Text/Text";
import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { decideValueAttribute } from "user/analytics/analyticsOverview/lib/overview.library";
import { Metrics, StatsMetric } from "user/analytics/analyticsOverview/types";

interface FilterValue {
  value: keyof StatsMetric;
}

type BoxProps = FilterValue & {
  processedStats: StatsMetric;
  onSetMetric: (key: keyof Metrics, value: keyof StatsMetric) => void;
  metric: string;
};

const FilterBox = ({
  value,
  processedStats,
  onSetMetric,
  metric,
}: BoxProps) => {
  const processed = processedStats[value];
  const attrs = decideValueAttribute(value);
  const displayVal = attrs.decimal
    ? processed.toFixed(attrs.decimal)
    : processed.toLocaleString();

  return (
    <Box
      border="1px solid #ededed"
      borderRadius="4px"
      height="130px"
      width="180px"
      marginRight="28px"
      bgcolor="#fff"
      sx={{ borderRadius: "12px" }}
    >
      <MetricSelect
        onSetMetric={onSetMetric}
        initialValue={value}
        metric={metric as keyof Metrics}
      />
      <Box
        display="flex"
        height="74px"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Typography>
          {attrs.prefix ?? ""} {displayVal} {attrs.suffix ?? ""}
        </Typography>
      </Box>
    </Box>
  );
};

interface MetricProps {
  processedStats: StatsMetric;
  onSetMetric: (key: keyof Metrics, value: keyof StatsMetric) => void;
  metrics: Metrics;
}

export default function MetricFilter({
  processedStats,
  onSetMetric,
  metrics,
}: MetricProps) {
  return (
    <Stack direction="column" spacing={1}>
      {Object.entries(metrics).map((f, i) => (
        <FilterBox
          value={f[1]}
          processedStats={processedStats}
          onSetMetric={onSetMetric}
          metric={f[0]}
          key={`${f[1]}-${i}`}
        />
      ))}
    </Stack>
  );
}
