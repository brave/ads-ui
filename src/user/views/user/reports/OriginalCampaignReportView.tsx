import { useState } from "react";
import { Box } from "@mui/material";
import ReportUtils from "@/user/analytics/analyticsOverview/components/ReportUtils";
import { EngagementsOverview } from "@/user/analytics/analyticsOverview/reports/campaign/EngagementsOverview";
import { CampaignDetails } from "@/user/views/user/CampaignDetails";
import { CollapseBox } from "@/components/Collapse/CollapseBox";
import { OsOverview } from "@/user/analytics/analyticsOverview/reports/os/OsOverview";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";
import {
  AnalyticOverviewDocument,
  CampaignSummaryFragment,
} from "@/graphql-client/graphql";
import dayjs, { Dayjs } from "dayjs";
import { useQuery } from "@apollo/client";

interface Props {
  campaignSummary: CampaignSummaryFragment;
}

export function OriginalCampaignReportView({ campaignSummary }: Props) {
  const { _ } = useLingui();
  const today = new Date();
  const [startDate, setStartDate] = useState<Dayjs | undefined>();
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());

  const setDateRange = (d: Dayjs, type: "start" | "end") => {
    if (type === "start") {
      setStartDate(d);
    } else if (type === "end") {
      setEndDate(d);
    }
  };

  const { loading, data, error } = useQuery(AnalyticOverviewDocument, {
    variables: {
      id: campaignSummary.id,
    },
    onCompleted(d) {
      if (d.campaign) {
        setStartDate(dayjs.utc(d.campaign.startAt));

        const end = dayjs.utc(d.campaign.endAt);
        if (end.isBefore(today)) {
          setEndDate(end.add(2, "day"));
        }
      }
    },
    pollInterval: 600_000,
    fetchPolicy: "cache-and-network",
  });

  const filteredEngagements = (data?.campaign?.engagements ?? []).filter(
    (engagement) =>
      dayjs(engagement.createdat) >= dayjs.utc(startDate).startOf("day") &&
      dayjs(engagement.createdat) <= dayjs.utc(endDate).endOf("day"),
  );

  const isLoading = loading || !data || !data.campaign || !startDate;
  const campaign = data?.campaign;
  const showReport = campaign && !loading && !error;

  return (
    <Box>
      <ReportUtils
        startDate={startDate}
        endDate={endDate}
        campaign={{
          id: campaignSummary.id,
          name: campaignSummary.name,
          format: campaignSummary.format,
          adSets: campaign?.adSets,
        }}
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

      {showReport && filteredEngagements.length > 0 && (
        <CollapseBox header={_(msg`Additional Report: OS Performance`)}>
          <OsOverview engagements={filteredEngagements} />
        </CollapseBox>
      )}
    </Box>
  );
}
