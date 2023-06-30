import { useParams } from "react-router-dom";
import React, { useState } from "react";
import { useAnalyticOverviewQuery } from "graphql/analytics-overview.generated";
import { Box } from "@mui/material";
import moment from "moment";
import ReportUtils from "user/analytics/analyticsOverview/components/ReportUtils";
import { EngagementsOverview } from "user/analytics/analyticsOverview/reports/campaign/EngagementsOverview";
import { CampaignDetails } from "user/views/user/CampaignDetails";

interface Params {
  campaignId: string;
}

export function CampaignReportView() {
  const params = useParams<Params>();
  const today = new Date();
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date>(today);

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
    onCompleted(d) {
      if (d.campaign) {
        setStartDate(d.campaign.startAt);

        const end = new Date(d.campaign.endAt);
        if (end.getTime() < today.getTime()) {
          end.setDate(end.getDate() + 2);
          setEndDate(end);
        }
      }
    },
    pollInterval: 600_000,
    fetchPolicy: "cache-and-network",
  });

  const filteredEngagements = (data?.campaign?.engagements ?? []).filter(
    (engagement) =>
      moment(engagement.createdat) >= moment.utc(startDate).startOf("day") &&
      moment(engagement.createdat) <= moment.utc(endDate).endOf("day")
  );

  const isLoading = loading || !data || !data.campaign || !startDate;

  return (
    <Box padding={2}>
      <ReportUtils
        startDate={startDate}
        endDate={endDate}
        campaign={{ id: params.campaignId, name: data?.campaign?.name ?? "" }}
        onSetDate={setDateRange}
      />

      <EngagementsOverview
        loading={isLoading}
        campaign={data?.campaign}
        engagements={filteredEngagements}
        error={error}
      />

      <div style={{ margin: "20px" }} />

      <CampaignDetails
        engagementLoading={isLoading}
        engagements={filteredEngagements}
      />
    </Box>
  );
}
