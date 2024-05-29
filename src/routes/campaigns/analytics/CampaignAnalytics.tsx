import { graphql } from "@/graphql-client";
import { useQuery } from "@apollo/client";
import { MetricsList } from "./MetricsList";
import { Box } from "@mui/material";
import { useMetricSelection } from "./hooks";
import { useState } from "react";
import { FilterBar } from "./filters/FilterBar";
import { ResultsPane } from "./ResultsPane";
import { PerformanceFilter } from "@/graphql-client/graphql";
import dayjs from "dayjs";
import { CampaignOverviewProps } from "@/util/CampaignIdProps";
import { ErrorDetail } from "@/components/Error/ErrorDetail";
import { msg } from "@lingui/macro";

const Analytics_Load = graphql(`
  query CampaignAnalytics($filter: PerformanceFilter!) {
    performance(filter: $filter) {
      total {
        metrics {
          ...DisplayedMetrics
        }
      }
      values {
        ...DailyMetricValues
      }
    }
  }
`);

export function CampaignAnalytics({ campaignOverview }: CampaignOverviewProps) {
  const { forceDefaultMetricSelection: forceDefaultSelection } =
    useMetricSelection();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [filter, setFilter] = useState<PerformanceFilter>({
    campaignIds: [campaignOverview.id],
  });

  const { data, error } = useQuery(Analytics_Load, {
    pollInterval: 10 * 60 * 1000,
    variables: {
      filter,
    },
  });

  if (isFirstLoad) {
    setIsFirstLoad(false);
    forceDefaultSelection();
  }

  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails={msg`Unable to load reporting details for campaign: ${campaignOverview.name}`}
      />
    );
  }

  return (
    <Box
      // this refers to the layout of the vertical flexbox that contains this component:
      //  it should grow to fill the available space vertically
      flex="auto"
      // and these control the layout of these elements contained within this box
      //  see https://css-tricks.com/snippets/css/complete-guide-grid/
      // on small screens the grid will have a single column, so the metrics are listed below
      // the graph. On larger screens the metrics are in a column to the right of the graph
      // (slightly more spaced out on even bigger screens).
      display="grid"
      gap={1}
      gridTemplateColumns={{ xs: "1fr", md: "1fr 300px", lg: "1fr 350px" }}
      gridTemplateRows={{ xs: "auto auto", md: "auto 1fr" }}
      gridTemplateAreas={{
        xs: `
        "filter"
        "graph"
        "metrics"
        `,
        md: `
          "filter filter"
          "graph metrics"
        `,
      }}
    >
      <Box gridArea="filter">
        <FilterBar
          filters={filter}
          onChange={setFilter}
          minDate={dayjs(campaignOverview.startAt)}
          maxDate={dayjs(campaignOverview.endAt)}
        />
      </Box>

      <Box height={{ xs: "500px", md: "auto" }} gridArea="graph">
        <ResultsPane
          filters={filter}
          overTimeData={data?.performance?.values}
          campaignOverview={campaignOverview}
        />
      </Box>

      <Box gridArea="metrics" sx={{ overflowY: "scroll" }}>
        <MetricsList
          dataSource={data?.performance?.total?.metrics}
          campaignOverview={campaignOverview}
        />
      </Box>
    </Box>
  );
}
