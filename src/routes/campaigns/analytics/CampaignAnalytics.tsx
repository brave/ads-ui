import { graphql } from "@/graphql-client";
import { useQuery } from "@apollo/client";
import { MetricsList } from "./MetricsList";
import { Box, Card, Stack, Typography } from "@mui/material";
import { useCampaignAnalyticFilter } from "./hooks";
import { FilterBar } from "./filters/FilterBar";
import { ResultsPane } from "./ResultsPane";
import { CampaignOverviewProps } from "@/util/CampaignIdProps";
import { ErrorDetail } from "@/components/Error/ErrorDetail";
import { Status } from "@/components/Campaigns/Status";
import { VerticalBreakdown } from "@/routes/campaigns/analytics/filters/BreakdownSelector";

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
  const { filter, setFilter } = useCampaignAnalyticFilter({ campaignOverview });

  const { data, error } = useQuery(Analytics_Load, {
    pollInterval: 10 * 60 * 1000,
    variables: {
      filter,
    },
  });

  const campaignName = campaignOverview.name;
  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails={`Unable to load reporting details for campaign: ${campaignName}`}
      />
    );
  }

  return (
    <Box display="flex" width="100%" flexDirection="column">
      <Box
        component={Card}
        p={2}
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
        gridTemplateColumns={{ xs: "1fr", md: "1fr 305px" }}
        gridTemplateRows={{ xs: "auto auto", md: "auto 1fr" }}
        gridTemplateAreas={{
          xs: `
      "header"
      "graph"
      "metrics"
      "report"
      `,
          md: `
        "header header"
        "graph metrics"
      `,
        }}
      >
        <Box
          gridArea="header"
          display="flex"
          flexDirection="row"
          gap={1}
          mb={1}
          alignItems="baseline"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          <Stack direction="row" spacing={1}>
            <Typography fontWeight={600}>{campaignOverview.name}</Typography>
            <Status
              state={campaignOverview.state}
              start={campaignOverview.startAt}
              end={campaignOverview.endAt}
            />
          </Stack>

          <FilterBar
            filters={filter}
            onChange={setFilter}
            campaignId={campaignOverview.id}
          />
        </Box>

        <Box
          height={{ xs: "500px", md: "auto" }}
          gridArea="graph"
          display="flex"
        >
          <VerticalBreakdown />
          <ResultsPane
            filters={filter}
            overTimeData={data?.performance?.values}
            campaignOverview={campaignOverview}
          />
        </Box>

        <Box gridArea="metrics" sx={{ overflowY: "auto", minHeight: 600 }}>
          <MetricsList
            dataSource={data?.performance?.total?.metrics}
            campaignOverview={campaignOverview}
          />
        </Box>
      </Box>
    </Box>
  );
}
