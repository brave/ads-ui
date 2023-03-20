import { Box, FormControl, MenuItem, Select, Tab, Tabs } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import React, { useState } from "react";
import { Options, SeriesOptionsType } from "highcharts";
import { Option } from "../types";

interface Props {
  categories: string[];
  series: SeriesOptionsType[];
  onSetType: (t: string) => void;
  extraOptions?: Option[];
  type: string;
}

export function BaseBarChart({
  categories,
  series,
  onSetType,
  extraOptions,
  type,
}: Props) {
  const options: Options = {
    chart: {
      type: "column",
    },
    title: {
      text: undefined,
    },
    accessibility: {
      point: {
        valueSuffix: type !== "cpa" ? "%" : undefined,
        valuePrefix: type === "cpa" ? "$" : undefined,
      },
    },
    xAxis: {
      categories,
    },
    plotOptions: {
      column: {
        allowPointSelect: true,
        cursor: "pointer",
        colorByPoint: true,
        dataLabels: {
          enabled: true,
        },
      },
    },
    tooltip: {
      valueDecimals: 2,
      pointFormat: type !== "cpa" ? "{point.y:.2f}%" : "${point.y:,.2f}",
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
          <Tab value="landingRate" label="Click to 10s Visit Rate" />
          <Tab value="ctr" label="CTR" />
          <Tab value="visitRate" label="10s visit rate" />
          {!!extraOptions &&
            extraOptions.map((o) => <Tab value={o.value} label={o.label} />)}
        </Tabs>
      </Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
