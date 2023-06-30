import _ from "lodash";
import { EngagementFragment } from "graphql/analytics-overview.generated";
import { StatsMetric } from "user/analytics/analyticsOverview/types";
import { processStats } from "user/analytics/analyticsOverview/lib/overview.library";

export function adEngagements(
  engagements: EngagementFragment[],
  type: "creativeinstance" | "creativeset"
) {
  const grouped = _.groupBy(engagements, `${type}id`);

  console.log(grouped);

  const metrics = new Map<string, StatsMetric>();
  for (let key in grouped) {
    const group = grouped[key];
    const stats = processStats(group);
    metrics.set(key, stats);
  }

  console.log(metrics);

  return metrics;
}
