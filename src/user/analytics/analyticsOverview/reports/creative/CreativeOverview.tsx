import * as Highcharts from "highcharts";
import { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React, { useState } from "react";
import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import { decideValueAttribute } from "../../lib/overview.library";
import { CampaignFormat } from "graphql/types";
import { EngagementFragment } from "graphql/analytics-overview.generated";
import { CampaignFragment } from "graphql/campaign.generated";
import { creativeEngagements } from "../../lib/creative.library";
import { CreativeMetric, StatsMetric } from "../../types";
import { CardContainer } from "components/Card/CardContainer";

interface Props {
  engagements: EngagementFragment[];
  campaign: CampaignFragment;
}

export function CreativeOverview({ engagements, campaign }: Props) {
  const [type, setType] = useState<string>("ctr");
  const isNtp = campaign.format === CampaignFormat.NtpSi;

  const metrics = creativeEngagements(engagements, campaign.format);

  const mapMetricToSeries = (cm: CreativeMetric[], type: keyof StatsMetric) => {
    return cm
      .map((m) => {
        const p = m.creativePayload;
        const y = m[type];

        return {
          name: p.title,
          y: y === Infinity ? 0 : y,
          custom: {
            name: p.body,
          },
        };
      })
      .filter((p) => p.y > 0);
  };

  const [chart, setChart] = useState(mapMetricToSeries(metrics, "ctr"));

  const attrs = decideValueAttribute(type);
  const options: Options = {
    chart: {
      type: "bar",
      height: chart.length > 10 ? chart.length * 30 : undefined,
    },
    title: {
      text: undefined,
    },
    xAxis: {
      categories: chart.map((c) => c.name),
      title: {
        text: null,
      },
    },
    accessibility: {
      point: {
        valueSuffix: attrs.suffix,
        valuePrefix: attrs.prefix,
      },
    },
    yAxis: {
      labels: {
        overflow: "justify",
      },
    },
    plotOptions: {
      bar: {
        colorByPoint: true,
        dataLabels: {
          enabled: true,
          inside: true,
        },
      },
    },
    tooltip: {
      valueDecimals: attrs.decimal,
      valuePrefix: attrs.prefix,
      valueSuffix: attrs.suffix,
    },
    series: [
      {
        name: "Ads",
        type: "bar",
        data: chart,
        dataLabels: [
          {
            align: "center",
            format: isNtp ? "" : "{point.options.custom.name}",
            color: "#FFFFFF",
            style: {
              fontSize: "12px",
              fontFamily: "Verdana, sans-serif",
            },
          },
          {
            align: "right",
            format: attrs.format,
            color: "#FFFFFF",
            style: {
              fontSize: "12px",
              fontFamily: "Verdana, sans-serif",
            },
          },
        ],
      },
    ],
  };

  const onChange = (metric: CreativeMetric[], type: keyof StatsMetric) => {
    setType(type);
    setChart(mapMetricToSeries(metric, type));
  };

  return (
    <CardContainer header="Creative Performance">
      {isNtp && (
        <Stack display="flex" direction="row" justifyContent="space-evenly">
          {metrics.map((ntp, idx) => (
            <Stack
              display="flex"
              direction="column"
              alignItems="center"
              flexWrap="wrap"
              key={`creativeMetric-${idx}`}
            >
              <img
                src={ntp.creativePayload.body}
                alt={`Image ${idx + 1}`}
                height={200}
                width={300}
              />
              <Typography variant="caption">Image {idx + 1}</Typography>
            </Stack>
          ))}
        </Stack>
      )}
      <Box
        sx={{
          width: "100%",
          height: "50px",
          backgroundColor: "white",
          borderBottom: "1px solid #ededed",
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Tabs
          value={type}
          onChange={(evt, v) => {
            onChange(metrics, v);
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="ctr" label="CTR" />
          <Tab value="landingRate" label="Click to 10s visit rate" />
          <Tab value="visitRate" label="10s Visit Rate" />
          {!isNtp && <Tab value="cpa" label="CPA" />}
          <Tab value="views" label="Impressions" />
          <Tab value="conversions" label="Conversions" />
          <Tab value="clicks" label="Clicks" />
          {!isNtp && <Tab value="spend" label="Spend" />}
        </Tabs>
      </Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </CardContainer>
  );
}
