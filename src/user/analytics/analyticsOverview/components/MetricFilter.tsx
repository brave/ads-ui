import MetricSelect from "user/analytics/analyticsOverview/components/MetricSelect";
import { Text } from "components/Text/Text";
import React from "react";
import { Box } from "@mui/material";
import { decideValueAttribute } from "user/analytics/analyticsOverview/lib/overview.library";
import { Metrics, StatsMetric } from "user/analytics/analyticsOverview/types";

interface FilterValue {
  value: keyof StatsMetric;
}

type BoxProps = FilterValue & {
  processedStats: StatsMetric;
  onSetMetric: (key: keyof Metrics, value: keyof StatsMetric) => void;
  metric: string;
  isNtp: boolean;
};

const FilterBox = ({
  value,
  processedStats,
  onSetMetric,
  metric,
  isNtp,
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
      width="195px"
      marginRight="28px"
    >
      <Box
        width="100%"
        height="56px"
        bgcolor="white"
        borderBottom="1px solid #ededed"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <MetricSelect
          onSetMetric={onSetMetric}
          initialValue={value}
          metric={metric as keyof Metrics}
          isNtp={isNtp}
        />
      </Box>
      <Box
        display="flex"
        height="74px"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Text
          content={`${attrs.prefix ?? ""}${displayVal}${attrs.suffix ?? ""}`}
          fontFamily={"Poppins"}
          sizes={[18, 18, 42, 42, 22]}
        />
      </Box>
    </Box>
  );
};

interface MetricProps {
  processedStats: StatsMetric;
  onSetMetric: (key: keyof Metrics, value: keyof StatsMetric) => void;
  metrics: Metrics;
  isNtp: boolean;
}

export default function MetricFilter({
  processedStats,
  onSetMetric,
  metrics,
  isNtp,
}: MetricProps) {
  return (
    <Box
      display="flex"
      marginBottom="28px"
      marginTop="14px"
      justifyContent="space-evenly"
    >
      {Object.entries(metrics).map((f, i) => (
        <FilterBox
          value={f[1]}
          processedStats={processedStats}
          onSetMetric={onSetMetric}
          metric={f[0]}
          key={`${f[1]}-${i}`}
          isNtp={isNtp}
        />
      ))}
    </Box>
  );
}
