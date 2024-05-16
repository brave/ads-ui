import { CampaignFormat } from "@/graphql-client/graphql";

import { isCreativeTypeApplicableToCampaignFormat } from "@/user/library";

export function filterCreativesByCampaignFormat<
  T extends { type: { code: string } },
>(creatives: T[], campaignFormat: CampaignFormat | null) {
  if (!campaignFormat) return creatives;

  return creatives.filter((c) =>
    isCreativeTypeApplicableToCampaignFormat(c.type, campaignFormat),
  );
}
