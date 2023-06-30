import React, { useState } from "react";
import { Alert, Box, LinearProgress, Skeleton, Stack } from "@mui/material";
import moment from "moment/moment";
import { CampaignFormat } from "graphql/types";
import {
  CampaignWithEngagementsFragment,
  EngagementFragment,
  useAnalyticOverviewQuery,
} from "graphql/analytics-overview.generated";
import { useParams } from "react-router-dom";
import ReportUtils from "./analyticsOverview/components/ReportUtils";
import { EngagementsOverview } from "./analyticsOverview/reports/campaign/EngagementsOverview";
import { DashboardButton } from "components/Button/DashboardButton";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { ApolloError } from "@apollo/client";

interface Params {
  campaignId: string;
}

interface Props {
  loading: boolean;
  campaign?: Omit<CampaignWithEngagementsFragment, "engagements">;
  engagements?: EngagementFragment[];
  error?: ApolloError;
}

export function AnalyticsOverview({
  loading,
  campaign,
  engagements,
  error,
}: Props) {
  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails="Unable to retrieve reporting data for this Campaign."
      />
    );
  }

  if (loading) {
    return (
      <Box padding={2}>
        <Skeleton variant="rounded" height={"400px"} />
      </Box>
    );
  }

  if (campaign?.format === CampaignFormat.NtpSi) {
    return (
      <Box p={3}>
        <DashboardButton />
        <Alert severity="info" sx={{ mt: 2, mb: 10 }}>
          Please ask your Account Manager for reports on campaigns of this
          format.
        </Alert>
      </Box>
    );
  }

  // if (!engagements || engagements.length === 0) {
  //   return (
  //     <Box p={3}>
  //       <DashboardButton />
  //       <Alert severity="info" sx={{ mt: 2, mb: 10 }}>
  //         Reporting not available yet for <strong>{campaign.name}</strong>.
  //       </Alert>
  //     </Box>
  //   );
  // }

  return (
    <Box>
      {/*<EngagementsOverview*/}
      {/*  engagements={engagements ?? []}*/}
      {/*  campaign={campaign}*/}
      {/*/>*/}

      {/*<DailyCampaignOverview*/}
      {/*  engagements={filteredEngagements ?? []}*/}
      {/*  campaign={data.campaign}*/}
      {/*/>*/}

      {/*<OsOverview*/}
      {/*  engagements={filteredEngagements ?? []}*/}
      {/*  campaign={data.campaign}*/}
      {/*/>*/}

      {/*<CreativeOverview*/}
      {/*  engagements={filteredEngagements ?? []}*/}
      {/*  campaign={data.campaign}*/}
      {/*/>*/}
    </Box>
  );
}
