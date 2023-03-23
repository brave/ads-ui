import React, { useState } from "react";
import { BasePieChart } from "../../../components/BasePieChart";
import { SeriesOptionsType } from "highcharts";
import { OS, OSMetric } from "../../../types";
import { mapDevice } from "../../../lib/os.library";

export function OsPieChart(props: OSMetric & { isNtp: boolean }) {
  const [type, setType] = useState("view");

  const device = mapDevice(Object.entries(props.view));
  const total = device.mobile + device.desktop;

  const series: SeriesOptionsType[] = [
    {
      name: type === "device" ? "Device" : "OS",
      type: "pie",
      data: Object.entries(type === "device" ? device : (props[type] as OS))
        .map((os) => {
          return {
            animation: false,
            name: `${os[0]}`,
            y: os[1] / total,
            custom: {
              count: os[1].toLocaleString(),
            },
          };
        })
        .filter((s) => s.y > 0),
    },
  ];

  const extra = [{ value: "device", label: "Impressions (Device)" }];
  if (!props.isNtp) {
    extra.push({ value: "spend", label: "Spend" });
  }

  return (
    <BasePieChart
      series={series}
      onSetType={setType}
      extraOptions={extra}
      type={type}
    />
  );
}
