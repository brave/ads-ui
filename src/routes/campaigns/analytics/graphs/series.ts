import { DisplayedMetricsFragment } from "@/graphql-client/graphql";
import { MetricDefinition } from "../metrics";
import { SeriesSplineOptions, SeriesTooltipOptionsObject } from "highcharts";
import dayjs from "dayjs";
import BigNumber from "bignumber.js";

type Interval = "day" | "hour";

function populateZeroValues(
  data: [number, number][],
  interval: Interval,
): [number, number][] {
  if (data.length === 0) {
    return [[dayjs().utc().startOf("day").valueOf(), 0]];
  }

  const start = dayjs.utc(data[0][0]);
  const end = dayjs.utc(data[data.length - 1][0]);
  const result: [number, number][] = [];
  let current = start;
  let dataIndex = 0;
  while (!current.isAfter(end)) {
    if (data[dataIndex] && current.isSame(dayjs.utc(data[dataIndex][0]))) {
      result.push(data[dataIndex]);
      dataIndex++;
    } else {
      result.push([current.valueOf(), 0]);
    }
    current = current.add(1, interval);
  }
  return result;
}

export interface DataValues {
  timestamp: string;
  metrics: DisplayedMetricsFragment;
}

export function makeLineChartSeries(
  metric: MetricDefinition,
  data: DataValues[],
  interval: Interval,
): SeriesSplineOptions {
  const scalingFactor = metric.type === "rate" ? BigNumber(100) : BigNumber(1);

  const tooltip = (): SeriesTooltipOptionsObject => {
    switch (metric.type) {
      case "rate":
        return {
          valueDecimals: 2,
          valueSuffix: "%",
        };
      case "usd":
        return {
          valueDecimals: 2,
          valuePrefix: "$",
        };
      default:
        return {
          format: "{point.y:,.0f}",
        };
    }
  };

  return {
    type: "spline",
    name: metric.caption,
    id: metric.id,
    color: metric.color,
    tooltip: tooltip(),
    yAxis: metric.type,
    data: populateZeroValues(
      data.map((point) => [
        dayjs.utc(point.timestamp).valueOf(),
        metric.getValue(point.metrics).multipliedBy(scalingFactor).toNumber(),
      ]),
      interval,
    ),
  };
}
