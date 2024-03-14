import { Box, Switch, Tooltip, Typography, switchClasses } from "@mui/material";
import { MetricDefinition } from "./metrics";
import { RenderMetric } from "./RenderMetric";
import { useMetricSelection } from "./hooks";
import { CampaignMetricDetailValuesFragment } from "graphql/analytics-overview.generated";
import { Trans } from "@lingui/react";

interface Props {
  metricDefinition: MetricDefinition;
  dataSource: CampaignMetricDetailValuesFragment | undefined;
  isLast: boolean;
}

export function MetricSelector({
  metricDefinition,
  dataSource,
  isLast,
}: Props) {
  const { isSelected, toggleMetric } = useMetricSelection();
  const value = dataSource ? metricDefinition.getValue(dataSource) : undefined;

  return (
    <Box
      border="1px solid"
      borderColor="divider"
      borderBottom={isLast ? undefined : "none"}
      paddingRight={1}
      padding={1}
      bgcolor="white"
      display="flex"
      alignItems="center"
    >
      <Switch
        size="small"
        checked={isSelected(metricDefinition)}
        onChange={toggleMetric(metricDefinition)}
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
      <Tooltip
        title={
          metricDefinition.tooltip ? (
            <Trans id={metricDefinition.tooltip.id} />
          ) : undefined
        }
        placement="top-start"
      >
        <Typography variant="body2">
          <Trans id={metricDefinition.caption.id} />
        </Typography>
      </Tooltip>
      <Box flex="1" />
      <Box>
        <RenderMetric type={metricDefinition.type} value={value} />
      </Box>
    </Box>
  );
}
