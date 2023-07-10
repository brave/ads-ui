import MetricSelect from "user/analytics/analyticsOverview/components/MetricSelect";
import React, { useState } from "react";
import { Box, Stack, Switch, Tooltip, Typography } from "@mui/material";
import { decideValueAttribute } from "user/analytics/analyticsOverview/lib/overview.library";
import { Metrics, StatsMetric } from "user/analytics/analyticsOverview/types";

type FilterMetric = {
  key: keyof StatsMetric;
  active: boolean;
};

type SetMetricFunc = (
  key: keyof Metrics,
  value: keyof StatsMetric,
  active: boolean
) => void;

type BoxProps = {
  filter: FilterMetric;
  processedStats: StatsMetric;
  onSetMetric: SetMetricFunc;
  metric: string;
};

const FilterBox = ({
  filter,
  processedStats,
  onSetMetric,
  metric,
}: BoxProps) => {
  const processed = processedStats[filter.key];
  const attrs = decideValueAttribute(filter.key);
  const displayVal = attrs.decimal
    ? processed.toFixed(attrs.decimal)
    : processed.toLocaleString();

  return (
    <Box
      border="1px solid #ededed"
      borderRadius="4px"
      height="120px"
      width="180px"
      marginRight="20px"
      bgcolor="#fff"
      sx={{ borderRadius: "12px" }}
    >
      <MetricSelect
        onSetMetric={(key, value) => onSetMetric(key, value, filter.active)}
        initialValue={filter.key}
        metric={metric as keyof Metrics}
      />
      <Box
        display="flex"
        height="65px"
        justifyContent="space-evenly"
        alignItems="center"
        width="100%"
      >
        <Typography>
          {attrs.prefix ?? ""} {displayVal} {attrs.suffix ?? ""}
        </Typography>
        <Tooltip title={filter.active ? "Hide" : "Show"}>
          <Switch
            checked={filter.active}
            onChange={() => {
              onSetMetric(metric as keyof Metrics, filter.key, !filter.active);
            }}
          />
        </Tooltip>
      </Box>
    </Box>
  );
};

interface MetricProps {
  processedStats: StatsMetric;
  onSetMetric: SetMetricFunc;
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
          filter={f[1]}
          processedStats={processedStats}
          onSetMetric={onSetMetric}
          metric={f[0]}
          key={`${f[1].key}-${i}`}
        />
      ))}
    </Stack>
  );
}
