import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";
import { useAnalyticOverviewQuery } from "graphql/analytics-overview.generated";
import { Alert, Box } from "@mui/material";
import moment from "moment";
import ReportUtils from "user/analytics/analyticsOverview/components/ReportUtils";
import { EngagementsOverview } from "user/analytics/analyticsOverview/reports/campaign/EngagementsOverview";
import { CampaignDetails } from "user/views/user/CampaignDetails";
import { CollapseBox } from "components/Collapse/CollapseBox";
import { OsOverview } from "user/analytics/analyticsOverview/reports/os/OsOverview";
import { CampaignFormat } from "graphql/types";
import { AlwaysOnFormButton } from "components/Button/AlwaysOnFormButton";
import { useTrackMatomoPageView } from "hooks/useTrackWithMatomo";
import { useLingui } from "@lingui/react";
import { msg, Trans } from "@lingui/macro";
import { ContainedDashboardButton } from "components/Button/ContainedDashboardButton";

interface Params {
  campaignId: string;
}

export function CampaignReportView() {
  useTrackMatomoPageView({ documentTitle: "Campaign Reporting" });
  const history = useHistory();
  const params = useParams<Params>();
  const queryParams = new URLSearchParams(history.location.search);
  const format = queryParams.get("format") as CampaignFormat | null;
  const isValidFormat =
    !!format &&
    format !== CampaignFormat.NtpSi &&
    format !== CampaignFormat.Search;
  const { _ } = useLingui();
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
    skip: !isValidFormat,
    pollInterval: 600_000,
    fetchPolicy: "cache-and-network",
  });

  const filteredEngagements = (data?.campaign?.engagements ?? []).filter(
    (engagement) =>
      moment(engagement.createdat) >= moment.utc(startDate).startOf("day") &&
      moment(engagement.createdat) <= moment.utc(endDate).endOf("day"),
  );

  const isLoading = loading || !data || !data.campaign || !startDate;
  const campaign = data?.campaign;
  const showReport =
    campaign && campaign.format !== CampaignFormat.NtpSi && !loading && !error;

  if (!isValidFormat) {
    return (
      <Box>
        <Alert
          severity="info"
          sx={{ mt: 2, mb: 2, maxWidth: "800px", alignItems: "center" }}
          action={<ContainedDashboardButton />}
        >
          <Trans>
            Please ask your Account Manager for reports on campaigns of this
            format.
          </Trans>
        </Alert>
      </Box>
    );
  }

  return (
    <Box padding={2}>
      <ReportUtils
        startDate={startDate}
        endDate={endDate}
        campaign={{
          id: params.campaignId,
          name: campaign?.name ?? "",
          format: campaign?.format,
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

      <AlwaysOnFormButton />
    </Box>
  );
}
