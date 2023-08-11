import { useState } from "react";

import { mapDevice } from "user/analytics/analyticsOverview/lib/os.library";
import { OSMetric } from "user/analytics/analyticsOverview/types";
import { BasePieChart } from "../../../components/BasePieChart";
import { SeriesOptionsType } from "highcharts";

type OSReport = keyof OSMetric | "device";

export function OsPieChart(props: OSMetric) {
  const [type, setType] = useState<OSReport>("view");

  const device = mapDevice(Object.entries(props.view));
  const total = device.mobile + device.desktop;

  const series: SeriesOptionsType[] = [
    {
      name: type === "device" ? "Device" : "OS",
      type: "pie",
      data: Object.entries(type === "device" ? device : props[type])
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

  const extra = [
    { value: "device", label: "Impressions (Device)" },
    { value: "spend", label: "Spend" },
  ];
  return (
    <BasePieChart
      series={series}
      onSetType={(v) => setType(v as OSReport)}
      extraOptions={extra}
      type={type}
    />
  );
}
