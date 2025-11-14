import { Box, Switch, Typography, switchClasses } from "@mui/material";
import { MetricDefinition } from "./metrics";
import { DisplayedMetricsFragment } from "@/graphql-client/graphql";
import { RenderMetricValue } from "./RenderMetricValue";
import { useMetricSelection } from "./hooks";

interface Props {
  metricDefinition: MetricDefinition;
  dataSource: DisplayedMetricsFragment | undefined;
  isLast: boolean;
}

export function MetricSelector({
  metricDefinition,
  dataSource,
  isLast,
}: Props) {
  const { isSelected, toggleMetric, selectedMetrics, forceDefaultSelection } =
    useMetricSelection();
  const value = dataSource ? metricDefinition.getValue(dataSource) : undefined;

  if (selectedMetrics.length === 0) {
    forceDefaultSelection();
    return null;
  }

  return (
    <Box
      border="1px solid"
      borderColor="divider"
      borderBottom={isLast ? undefined : "none"}
      paddingRight={1}
      padding={1}
      display="flex"
      alignItems="center"
    >
      <Switch
        size="small"
        checked={isSelected(metricDefinition)}
        onChange={() => toggleMetric(metricDefinition)}
        color="default"
        sx={{
          [`& .${switchClasses.checked}`]: {
            [`&.${switchClasses.switchBase}`]: {
              color: metricDefinition.color,
            },
            [`+.${switchClasses.track}`]: {
              backgroundColor: metricDefinition.color,
            },
          },
        }}
      />
      <Typography variant="body2">{metricDefinition.caption}</Typography>
      <Box flex="1" />
      <Box>
        <RenderMetricValue metric={metricDefinition} value={value} />
      </Box>
    </Box>
  );
}
