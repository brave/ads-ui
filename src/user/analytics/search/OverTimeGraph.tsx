import { DailyValuesFragment } from "graphql/analytics-overview.generated";
import { useMetricSelection } from "./hooks";
import { makeLineChartSeries } from "./series";
import { HighchartsWrapper } from "user/analytics/analyticsOverview/components/HighchartsWrapper";

interface Props {
  dataSource: DailyValuesFragment[] | undefined;
}

export function OverTimeGraph({ dataSource }: Props) {
  const { selectedMetrics } = useMetricSelection();

  const series = selectedMetrics.map((metric) =>
    makeLineChartSeries(metric, dataSource ?? []),
  );

  return (
    <HighchartsWrapper
      height="500px"
      p={2}
      options={{
        time: {
          useUTC: true,
        },
        title: {
          text: undefined,
        },
        credits: {
          enabled: false,
        },
        chart: {
          type: "spline",
          spacingTop: 30,
          spacingBottom: 10,
          spacingRight: 10,
          spacingLeft: 10,
          zooming: {
            type: "x",
          },
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            millisecond: "%H:%M:%S.%L",
            second: "%H:%M:%S",
            minute: "%H:%M",
            hour: "%H:%M",
            // eslint-disable-next-line lingui/no-unlocalized-strings
            day: "%e %b",
            // eslint-disable-next-line lingui/no-unlocalized-strings
            week: "%e %b",
            // eslint-disable-next-line lingui/no-unlocalized-strings
            month: "%b %Y",
            year: "%Y",
          },
        },
        yAxis: [
          {
            id: "number",
            opposite: false,
            title: {
              text: undefined,
            },
            min: 0,
            // see https://stackoverflow.com/a/42529357 - forces the axis to always draw zero
            // at the bottom of the chart
            softMax: 10,
            allowDecimals: false,
          },
          {
            id: "usd",
            opposite: true,
            title: {
              text: undefined,
            },
            labels: {
              format: "${value:,.0f}",
            },
            min: 0,
            softMax: 10,
          },
          {
            id: "rate",
            opposite: true,
            title: {
              text: undefined,
            },
            labels: {
              format: "{value}%",
            },
            min: 0,
            softMax: 1,
          },
        ],
        legend: {
          enabled: false,
        },
        tooltip: {
          split: true,
          xDateFormat: "%a %e %b %Y",
        },
        plotOptions: {
          spline: {
            connectNulls: false,
            marker: {
              symbol: "circle",
              radius: 3,
              enabledThreshold: 10,
            },
            lineWidth: 2,
          },
        },
        series,
      }}
    />
  );
}
