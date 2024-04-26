import _ from "lodash";
import { StatsMetric } from "@/user/analytics/analyticsOverview/types";
import { processStats } from "@/user/analytics/analyticsOverview/lib/overview.library";
import { EngagementFragment } from "@/graphql-client/graphql";

export function adEngagements(
  engagements: EngagementFragment[],
  type: "creativeinstance" | "creativeset",
) {
  const grouped = _.groupBy(engagements, `${type}id`);
  const metrics = new Map<string, StatsMetric>();
  for (const key in grouped) {
    const group = grouped[key];
    const stats = processStats(group);
    if (!stats) {
      continue;
    }

    metrics.set(key, stats);
  }
  return metrics;
}
