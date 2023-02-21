import React from "react";
import { Box, Typography } from "@mui/material";
import { BaseMetric, Metrics } from "../types";
import { decideValueAttribute } from "../lib/overview.library";
import MetricSelect from "./MetricSelect";
import { Text } from "../../../../components/Text/Text";

interface FilterValue {
  value: string;
}

type BoxProps = FilterValue & {
  processedStats: BaseMetric;
  onSetMetric: (key: keyof Metrics, value: string) => void;
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
  processedStats: BaseMetric;
  onSetMetric: (key: keyof Metrics, value: string) => void;
  metrics: Metrics;
}

export default function MetricFilter({
  processedStats,
  onSetMetric,
  metrics,
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
        />
      ))}
    </Box>
  );
}
