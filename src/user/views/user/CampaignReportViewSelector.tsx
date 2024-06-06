import { Box, LinearProgress } from "@mui/material";
import { AlwaysOnFormButton } from "@/components/Button/AlwaysOnFormButton";
import { useParams, useRouteMatch } from "react-router-dom";
import { CampaignFormat } from "@/graphql-client/graphql";
import { ConsultAccountManager } from "./reports/ConsultAccountManager";
import { OriginalCampaignReportView } from "./reports/OriginalCampaignReportView";
import { useQuery } from "@apollo/client";
import { AnalyticsOverview } from "@/routes/campaigns/analytics/AnalyticsOverview";
import MiniSideBar from "@/components/Drawer/MiniSideBar";
import { graphql } from "@/graphql-client/index";

interface Params {
  campaignId: string;
}

// temporarily, we need to use different reporting views for
// different campaign types. This view chooses the correct reporting
// view to use.
const Campaign_Load = graphql(`
  query LoadCampaignSummary($id: String!) {
    campaign(id: $id) {
      ...CampaignOverview
    }
  }

  fragment CampaignOverview on Campaign {
    ...CampaignSummary
    adSets {
      id
      conversions {
        id
        extractExternalId
      }
    }
  }
`);

export function CampaignReportViewSelector() {
  const match = useRouteMatch();
  const isReport = match.url.includes("report");

  const { campaignId } = useParams<Params>();

  const { data } = useQuery(Campaign_Load, {
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
  const isSearch = format === CampaignFormat.Search;

  return (
    <MiniSideBar>
      <Box padding={2} width="100%">
        {format === CampaignFormat.NtpSi ? (
          <ConsultAccountManager />
        ) : isSearch || isReport ? (
          <AnalyticsOverview campaignOverview={data.campaign} />
        ) : (
          <OriginalCampaignReportView campaignSummary={data.campaign} />
        )}

        <AlwaysOnFormButton />
      </Box>
    </MiniSideBar>
  );
}
