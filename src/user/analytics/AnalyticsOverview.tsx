import React, { useState } from "react";
import { Alert, Box, LinearProgress } from "@mui/material";
import moment from "moment/moment";
import { CampaignFormat } from "graphql/types";
import {
  AnalyticOverviewQuery,
  useAnalyticOverviewQuery,
} from "graphql/analytics-overview.generated";
import { useParams } from "react-router-dom";
import ReportUtils from "./analyticsOverview/components/ReportUtils";
import { EngagementsOverview } from "./analyticsOverview/reports/campaign/EngagementsOverview";
import { DailyCampaignOverview } from "./analyticsOverview/reports/campaign/DailyCampaignOverview";
import { CreativeOverview } from "./analyticsOverview/reports/creative/CreativeOverview";
import { OsOverview } from "./analyticsOverview/reports/os/OsOverview";
import { DashboardButton } from "components/Button/DashboardButton";
import { ErrorDetail } from "components/Error/ErrorDetail";

interface Params {
  campaignId: string;
}

const AnalyticsOverview: React.FC = () => {
  const params = useParams<Params>();
  const today = new Date();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date>(today);

  const initializeCampaign = (data: AnalyticOverviewQuery, now: Date) => {
    if (data.campaign) {
      setStartDate(data.campaign.startAt);

      const end = new Date(data.campaign.endAt);
      if (end.getTime() < now.getTime()) {
        end.setDate(end.getDate() + 2);
        setEndDate(end);
      }
    }
  };

  const setDateRange = (d: Date, type: "start" | "end") => {
    if (type === "start") {
      setStartDate(d);
    } else if (type === "end") {
      setEndDate(d);
    }
  };

  const { loading, data, error } = useAnalyticOverviewQuery({
    variables: {
      id: params.campaignId,
    },
    onCompleted: (d) => initializeCampaign(d, today),
    pollInterval: 600_000,
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails="Unable to retrieve reporting data for this Campaign."
      />
    );
  }

  if (loading || !data || !data.campaign || !startDate) {
    return <LinearProgress />;
  }

  const filteredEngagements = data.campaign.engagements?.filter(
    (engagement) =>
      moment(engagement.createdat) >= moment.utc(startDate).startOf("day") &&
      moment(engagement.createdat) <= moment.utc(endDate).endOf("day")
  );

  if (data.campaign.format === CampaignFormat.NtpSi) {
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

  if (!filteredEngagements || filteredEngagements.length === 0) {
    return (
      <Box p={3}>
        <DashboardButton />
        <Alert severity="info" sx={{ mt: 2, mb: 10 }}>
          Reporting not available yet for <strong>{data.campaign.name}</strong>.
        </Alert>
      </Box>
    );
  }

  return (
    <Box padding={2}>
      <ReportUtils
        startDate={startDate}
        endDate={endDate}
        campaign={{ id: data.campaign.id, name: data.campaign.name }}
        onSetDate={setDateRange}
      />

      <EngagementsOverview
        engagements={filteredEngagements ?? []}
        campaign={data.campaign}
        adSets={data.campaign.adSets}
      />

      <DailyCampaignOverview
        engagements={filteredEngagements ?? []}
        campaign={data.campaign}
      />

      <OsOverview
        engagements={filteredEngagements ?? []}
        campaign={data.campaign}
      />

      <CreativeOverview
        engagements={filteredEngagements ?? []}
        campaign={data.campaign}
      />
    </Box>
  );
};

export default AnalyticsOverview;
