import React, { useState } from "react";
import { SeriesOptionsType } from "highcharts";
import { BaseBarChart } from "../../../components/BaseBarChart";
import { CalculatedOSMetric } from "../../../types";

export function OsBarChart(props: CalculatedOSMetric & { isNtp: boolean }) {
  const validData = Object.entries(props.ctr);
  const [type, setType] = useState("landingRate");

  const mapToSeries = (
    metric: keyof CalculatedOSMetric
  ): SeriesOptionsType[] => {
    let series: SeriesOptionsType = {
      name: "OS",
      type: "column",
      data: validData.map((s) => {
        const os = s[0];
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

  const [validSeries, setValidSeries] = useState(mapToSeries("landingRate"));

  const onChange = (val: string) => {
    setType(val);
    const metric = val as keyof CalculatedOSMetric;
    setValidSeries(mapToSeries(metric));
  };

  const extra = !props.isNtp ? [{ value: "cpa", label: "CPA" }] : [];
  return (
    <BaseBarChart
      categories={validData.map((d) => d[0])}
      series={validSeries}
      onSetType={onChange}
      extraOptions={extra}
      type={type}
    />
  );
}
