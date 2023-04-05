import React, { useState } from "react";
import { Alert, AlertTitle, Box, Divider, LinearProgress } from "@mui/material";
import moment from "moment/moment";
import { CampaignFormat } from "../../graphql/types";
import {
  AnalyticOverviewQuery,
  useAnalyticOverviewQuery,
} from "../../graphql/analytics-overview.generated";
import { IAuthUser } from "../../actions";
import { useParams } from "react-router-dom";
import ReportUtils from "./analyticsOverview/components/ReportUtils";
import { EngagementsOverview } from "./analyticsOverview/reports/campaign/EngagementsOverview";
import { DailyCampaignOverview } from "./analyticsOverview/reports/campaign/DailyCampaignOverview";
import { CreativeOverview } from "./analyticsOverview/reports/creative/CreativeOverview";
import { OsOverview } from "./analyticsOverview/reports/os/OsOverview";
import { Text } from "../../components/Text/Text";

interface Params {
  campaignId: string;
}

interface Props {
  auth: IAuthUser;
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
    pollInterval: 600_000,
  });

  if (loading || !data || !data.campaign || !startDate)
    return <LinearProgress />;

  const filteredEngagements = data.campaign.engagements?.filter(
    (engagement) =>
      moment(engagement.createdat) >= moment.utc(startDate).startOf("day") &&
      moment(engagement.createdat) <= moment.utc(endDate).endOf("day")
  );

  if (data.campaign.format === CampaignFormat.NtpSi) {
    return (
      <Box>
        <Alert severity="info" sx={{ mt: 2, mb: 10 }}>
          Please ask your Account Manager for reports on campaigns of this
          format.
        </Alert>
      </Box>
    );
  }

  if (!filteredEngagements || filteredEngagements.length === 0) {
    return (
      <Box>
        <Alert severity="info" sx={{ mt: 2, mb: 10 }}>
          Reporting not available yet for <strong>{data.campaign.name}</strong>.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      <ReportUtils
        startDate={startDate}
        endDate={endDate}
        campaign={{ id: data.campaign.id, name: data.campaign.name }}
        onSetDate={setDateRange}
        auth={auth}
      />

      <Divider textAlign="left" sx={{ fontWeight: "600", mb: 2 }}>
        Overview
      </Divider>

      <EngagementsOverview
        engagements={filteredEngagements ?? []}
        campaign={data.campaign}
        adSets={data.campaign.adSets}
      />

      <Divider textAlign="left" sx={{ fontWeight: "600", mt: 5, mb: 3 }}>
        Daily Performance
      </Divider>

      <DailyCampaignOverview
        engagements={filteredEngagements ?? []}
        campaign={data.campaign}
      />

      <Divider textAlign="left" sx={{ fontWeight: "600", mt: 5, mb: 3 }}>
        OS Performance
      </Divider>

      <OsOverview
        engagements={filteredEngagements ?? []}
        campaign={data.campaign}
      />

      <Divider textAlign="left" sx={{ fontWeight: "600", mt: 5, mb: 3 }}>
        Creative Performance
      </Divider>

      <CreativeOverview
        engagements={filteredEngagements ?? []}
        campaign={data.campaign}
      />
    </Box>
  );
};

export default AnalyticsOverview;
