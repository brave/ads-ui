import {
  DailyMetricValuesFragment,
  PerformanceFilter,
} from "@/graphql-client/graphql";
import { useBreakdownParams } from "./hooks";
import { TabularData } from "./TabularData";
import { DailyGraph } from "./graphs/DailyGraph";
import { HourlyGraph } from "./graphs/HourlyGraph";
import { CampaignOverviewProps } from "@/util/CampaignIdProps";

interface Props extends CampaignOverviewProps {
  overTimeData: DailyMetricValuesFragment[] | undefined;
  filters: PerformanceFilter;
}

export function ResultsPane({
  overTimeData,
  campaignOverview,
  filters,
}: Props) {
  const { selected } = useBreakdownParams();

  if (!selected) return null;
  console.log(selected.id);

  if (selected.id === "day") {
    return <DailyGraph dataSource={overTimeData} />;
  }

  if (selected.id === "hour") {
    return (
      <HourlyGraph campaignOverview={campaignOverview} filters={filters} />
    );
  }

  return (
    <TabularData
      breakdown={selected}
      campaignOverview={campaignOverview}
      filters={filters}
    />
  );
}
