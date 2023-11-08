import { Box, Tab, Tabs } from "@mui/material";
import { Options, SeriesOptionsType } from "highcharts";
import { Option } from "../types";
import { HighchartsWrapper } from "user/analytics/analyticsOverview/components/HighchartsWrapper";

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

  const tabs: Option[] = [
    { value: "landingRate", label: "Click to site visit Rate" },
    { value: "ctr", label: "CTR" },
    { value: "visitRate", label: "Site visit rate" },
    ...(extraOptions ?? []),
  ];

  return (
    <Box border="1px solid #ededed" borderRadius="4px">
      <Box
        height="50px"
        bgcolor="white"
        borderBottom="1px solid #ededed"
        display="flex"
        justifyContent="left"
      >
        <Tabs
          value={type}
          onChange={(e, v) => {
            onSetType(v);
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((t) => (
            <Tab key={t.label} value={t.value} label={t.label} />
          ))}
        </Tabs>
      </Box>
      <HighchartsWrapper options={options} />
    </Box>
  );
}
