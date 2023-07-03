import React, { useState } from "react";
import { SeriesOptionsType } from "highcharts";
import { CalculatedOSMetric, OS } from "user/analytics/analyticsOverview/types";
import { BaseBarChart } from "../../../components/BaseBarChart";

export function OsBarChart(props: CalculatedOSMetric) {
  const oses: (keyof OS)[] = ["android", "ios", "linux", "macos", "windows"];
  const [type, setType] = useState<keyof CalculatedOSMetric>("ctr");

  const mapToSeries = (
    metric: keyof CalculatedOSMetric
  ): SeriesOptionsType[] => {
    let series: SeriesOptionsType = {
      name: "OS",
      type: "column",
      data: oses.map((os) => {
        return {
          name: os,
          y: props[metric][os],
          type: "column",
        };
      }),
      dataLabels: {
        enabled: true,
        rotation: 0,
        color: "#FFFFFF",
        align: "center",
        format: metric !== "cpa" ? "{point.y:.2f}%" : "${point.y:,.2f}",
        y: 30,
        style: {
          fontSize: "12px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    };

    return [
      {
        ...series,
      },
    ];
  };

  const [validSeries, setValidSeries] = useState(mapToSeries(type));

  const onChange = (val: string) => {
    const metric = val as keyof CalculatedOSMetric;
    setType(metric);
    setValidSeries(mapToSeries(metric));
  };

  const extra = [{ value: "cpa", label: "CPA" }];
  return (
    <BaseBarChart
      categories={oses.map((d) => d)}
      series={validSeries}
      type={type}
      onSetType={onChange}
      extraOptions={extra}
    />
  );
}
