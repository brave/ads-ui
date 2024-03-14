import { Box, LinearProgress } from "@mui/material";
import { AlwaysOnFormButton } from "components/Button/AlwaysOnFormButton";
import { useLoadCampaignSummaryQuery } from "graphql/campaign.generated";
import { useTrackMatomoPageView } from "hooks/useTrackWithMatomo";
import { useParams } from "react-router-dom";
import { CampaignFormat } from "graphql/types";
import { ConsultAccountManager } from "./reports/ConsultAccountManager";
import { OriginalCampaignReportView } from "./reports/OriginalCampaignReportView";
import { SearchCampaignReportView } from "./reports/SearchCampaignReportView";

interface Params {
  campaignId: string;
}

// temporarily, we need to use different reporting views for
// different campaign types. This view chooses the correct reporting
// view to use.
export function CampaignReportViewSelector() {
  useTrackMatomoPageView({ documentTitle: "Campaign Reporting" });

  const { campaignId } = useParams<Params>();

  const { data } = useLoadCampaignSummaryQuery({
    variables: {
      id: campaignId,
    },
  });

  if (!data) {
    return <LinearProgress />;
  }

  if (!data.campaign) {
    return null;
  }

  const format = data.campaign.format;

  return (
    <Box padding={2}>
      {format === CampaignFormat.NtpSi ? (
        <ConsultAccountManager />
      ) : format === CampaignFormat.Search ? (
        <SearchCampaignReportView campaignSummary={data.campaign} />
      ) : (
        <OriginalCampaignReportView campaignSummary={data.campaign} />
      )}

      <AlwaysOnFormButton />
    </Box>
  );
}
