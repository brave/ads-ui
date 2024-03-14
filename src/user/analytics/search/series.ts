import { MetricDefinition } from "./metrics";
import { SeriesSplineOptions, SeriesTooltipOptionsObject } from "highcharts";
import moment from "moment";
import BigNumber from "bignumber.js";
import { DailyValuesFragment } from "graphql/analytics-overview.generated";
import { i18n } from "@lingui/core";

function populateZeroValues(data: [number, number][]): [number, number][] {
  if (data.length === 0) {
    return [[moment().utc().startOf("day").valueOf(), 0]];
  }

  const start = moment.utc(data[0][0]);
  const end = moment.utc(data[data.length - 1][0]);
  const result: [number, number][] = [];
  let current = start;
  let dataIndex = 0;
  while (!current.isAfter(end)) {
    if (data[dataIndex] && current.isSame(moment.utc(data[dataIndex][0]))) {
      result.push(data[dataIndex]);
      dataIndex++;
    } else {
      result.push([current.valueOf(), 0]);
    }
    current = current.add(1, "day");
  }
  return result;
}

export function makeLineChartSeries(
  metric: MetricDefinition,
  data: DailyValuesFragment[],
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
    name: i18n._(metric.caption),
    id: metric.id,
    color: metric.color,
    tooltip: tooltip(),
    yAxis: metric.type,
    data: populateZeroValues(
      data.map((point) => [
        moment.utc(point.dimensions.day).valueOf(),
        metric.getValue(point.metrics).multipliedBy(scalingFactor).toNumber(),
      ]),
    ),
  };
}
