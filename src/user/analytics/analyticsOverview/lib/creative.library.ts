import _ from "lodash";
import { CampaignFormat } from "../../../../graphql/types";
import { EngagementFragment } from "../../../../graphql/analytics-overview.generated";
import { CreativeMetric } from "../types";
import { processStats } from "./overview.library";

export function creativeEngagements(
  engagements: EngagementFragment[],
  format: CampaignFormat
) {
  const isNtp = format === CampaignFormat.NtpSi;

  const byCreative = _.groupBy(engagements, (e) => {
    const payload = JSON.parse(e.creativepayload);

    return isNtp
      ? `${payload.wallpapers[0].imageUrl}`
      : `${payload.title}|${payload.body}`;
  });

  const metrics: CreativeMetric[] = [];

  let imageCount = 1;
  for (let key in byCreative) {
    const group = byCreative[key];
    const payload = JSON.parse(group[0].creativepayload);
    const reducedCreative = processStats(group);
    metrics.push({
      ...reducedCreative,
      creativePayload: {
        title: isNtp ? `Image ${imageCount}` : payload.title,
        body: isNtp ? payload.wallpapers[0].imageUrl : payload.body,
      },
    });
    imageCount = imageCount + 1;
  }

  return metrics;
}
