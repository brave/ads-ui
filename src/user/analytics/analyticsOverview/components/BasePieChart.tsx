import { Box, FormControl, Tab, Tabs } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import React from "react";
import { Options, SeriesOptionsType } from "highcharts";
import { Option } from "../types";

interface Props {
  series: SeriesOptionsType[];
  onSetType: (t: string) => void;
  extraOptions?: Option[];
  type: string;
}

export function BasePieChart({ series, onSetType, extraOptions, type }: Props) {
  const options: Options = {
    chart: {
      animation: false,
      type: "pie",
    },
    title: {
      text: undefined,
    },
    tooltip: {
      pointFormat: "{point.options.custom.count}",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series,
  };

  return (
    <Box border="1px solid #ededed" borderRadius="4px">
      <Box
        height="50px"
        bgcolor="white"
        borderBottom="1px solid #ededed"
        display="flex"
        justifyContent="center"
      >
        <Tabs
          value={type}
          onChange={(e, v) => {
            onSetType(v);
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="view" label="Impressions" />
          <Tab value="conversion" label="Conversions" />
          <Tab value="click" label="Clicks" />
          <Tab value="landed" label="10s visits" />
          {!!extraOptions &&
            extraOptions.map((o) => <Tab value={o.value} label={o.label} />)}
        </Tabs>
      </Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
