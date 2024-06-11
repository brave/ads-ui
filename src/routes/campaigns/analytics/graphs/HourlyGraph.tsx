import { graphql } from "@/graphql-client";
import { PerformanceFilter } from "@/graphql-client/graphql";
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { GraphSkeleton } from "./GraphSkeleton";
import { useMetricSelection } from "../hooks";
import { makeLineChartSeries } from "./series";
import { OverTimeGraph } from "./OverTimeGraph";
import { CampaignOverviewProps } from "@/util/CampaignIdProps";
import { isEnabledForCampaign } from "@/routes/campaigns/analytics/metrics";

const HourlyGraph_Load = graphql(`
  query HourlyGraph($filter: PerformanceFilter!) {
    performance(filter: $filter) {
      values {
        ...HourlyValues
      }
    }
  }

  fragment HourlyValues on Performance {
    dimensions {
      hour
    }
    metrics {
      ...DisplayedMetrics
    }
  }
`);

interface Props extends CampaignOverviewProps {
  filters: PerformanceFilter;
}

export function HourlyGraph({ campaignOverview, filters }: Props) {
  const { selectedMetrics } = useMetricSelection();

  // ensure we don't select too much data for the graph
  let from = dayjs.utc(filters.from ?? campaignOverview.startAt);
  const to = dayjs.min(
    dayjs.utc(filters.to ?? campaignOverview.endAt),
    dayjs.utc().endOf("day"),
  )!;

  if (to.diff(from, "days") > 35) {
    from = to.subtract(1, "month").startOf("day");
  }

  const { data } = useQuery(HourlyGraph_Load, {
    variables: {
      filter: {
        ...filters,
        from: from.toISOString(),
        to: to.toISOString(),
      },
    },
  });

  if (!data) {
    return <GraphSkeleton />;
  }

  const rawData = data.performance.values.map((d) => ({
    timestamp: d.dimensions.hour,
    metrics: d.metrics,
  }));

  const series = selectedMetrics
    .filter((m) => isEnabledForCampaign(m, campaignOverview))
    .map((metric) => makeLineChartSeries(metric, rawData, "hour"));

  return <OverTimeGraph series={series} hourly />;
}
