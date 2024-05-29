import { SeriesSplineOptions } from "highcharts";
import { HighchartsWrapper } from "@/user/analytics/analyticsOverview/components/HighchartsWrapper";

interface Props {
  series: SeriesSplineOptions[];
  hourly?: boolean;
}

export function OverTimeGraph({ series, hourly = false }: Props) {
  return (
    <HighchartsWrapper
      height="100%"
      maxHeight="625px"
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
            day: "%e %b",
            week: "%e %b",
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
          // eslint-disable-next-line lingui/no-unlocalized-strings
          xDateFormat: hourly ? "%a %e %b %Y %H:%M UTC" : "%a %e %b %Y",
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
