import { DailyMetricValuesFragment } from "@/graphql-client/graphql";
import { useMetricSelection } from "../hooks";
import { makeLineChartSeries } from "./series";
import { GraphSkeleton } from "./GraphSkeleton";
import { OverTimeGraph } from "./OverTimeGraph";

interface Props {
  dataSource: DailyMetricValuesFragment[] | undefined;
}

export function DailyGraph({ dataSource }: Props) {
  const { selectedMetrics } = useMetricSelection();

  if (!dataSource) {
    return <GraphSkeleton />;
  }

  const rawData = dataSource.map((d) => ({
    timestamp: d.dimensions.day,
    metrics: d.metrics,
  }));

  const series = selectedMetrics.map((metric) =>
    makeLineChartSeries(metric, rawData, "day"),
  );

  return <OverTimeGraph series={series} />;
}
