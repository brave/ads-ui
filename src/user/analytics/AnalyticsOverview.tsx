import React, { useState } from "react";
import { Box, Divider, LinearProgress, Typography } from "@mui/material";

import moment from "moment/moment";
import {
  useAnalyticOverviewQuery,
  AnalyticOverviewQuery,
} from "../../graphql/analytics-overview.generated";
import ReportUtils from "./analyticsOverview/components/ReportUtils";
import { CampaignOverview } from "./analyticsOverview/reports/campaign/CampaignOverview";
import { CampaignFormat } from "../../graphql/types";
import { useParams } from "react-router-dom";

interface Params {
  campaignId: string;
}

interface Props {
  auth: any;
}

const AnalyticsOverview: React.FC<Props> = ({ auth }: Props) => {
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

  const { loading, data } = useAnalyticOverviewQuery({
    variables: {
      id: params.campaignId,
    },
    onCompleted: (d) => initializeCampaign(d, today),
  });

  if (loading || !data || !data.campaign || !startDate)
    return <LinearProgress />;

  const filteredEngagements = data.campaign.engagements?.filter(
    (engagement) =>
      moment(engagement.createdat) >= moment.utc(startDate).startOf("day") &&
      moment(engagement.createdat) <= moment.utc(endDate).endOf("day")
  );

  return (
    <Box>
      <ReportUtils
        startDate={startDate}
        endDate={endDate}
        campaign={{ id: data.campaign.id, name: data.campaign.name }}
        onSetDate={setDateRange}
        auth={auth}
      />

      <Divider textAlign="left" sx={{ fontWeight: "600" }}>
        Campaign Overview
      </Divider>

      <CampaignOverview
        engagements={filteredEngagements ?? []}
        campaign={data.campaign}
      />

      {data.campaign.format === CampaignFormat.NtpSi && (
        <Typography>
          Sponsored Image reporting is a statistical approximation, derived from
          the percentage of Brave users that are opted-in to Brave Ads.
        </Typography>
      )}
    </Box>
  );
};

export default AnalyticsOverview;
