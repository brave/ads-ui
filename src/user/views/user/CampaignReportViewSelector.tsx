import { AlwaysOnFormButton } from "@/components/Button/AlwaysOnFormButton";
import MiniSideBar from "@/components/Drawer/MiniSideBar";
import { CampaignFormat } from "@/graphql-client/graphql";
import { graphql } from "@/graphql-client/index";
import { AnalyticsOverview } from "@/routes/campaigns/analytics/AnalyticsOverview";
import { useQuery } from "@apollo/client";
import { Box, LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { ConsultAccountManager } from "./reports/ConsultAccountManager";

interface Params {
  campaignId: string;
}

// temporarily, we need to use different reporting views for
// different campaign types. This view chooses the correct reporting
// view to use.
const Campaign_Load = graphql(`
  query LoadCampaignSummary($id: String!) {
    campaign(id: $id) {
      ...CampaignSummary
    }
  }
`);

export function CampaignReportViewSelector() {
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
  return (
    <MiniSideBar>
      <Box padding={2} width="100%">
        {format === CampaignFormat.NtpSi ? (
          <ConsultAccountManager />
        ) : (
          <AnalyticsOverview campaignOverview={data.campaign} />
        )}

        <AlwaysOnFormButton />
      </Box>
    </MiniSideBar>
  );
}
