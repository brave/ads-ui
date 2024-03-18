import { Trans, msg } from "@lingui/macro";
import { Box, Stack, Typography } from "@mui/material";
import { DashboardButton } from "components/Button/DashboardButton";
import { Status } from "components/Campaigns/Status";
import { CardContainer } from "components/Card/CardContainer";
import { DateRangePicker } from "components/Date/DateRangePicker";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { useFetchDailyMetricsForCampaignQuery } from "graphql/analytics-overview.generated";
import { CampaignSummaryFragment } from "graphql/campaign.generated";
import { PerformanceFilter } from "graphql/types";
import { useState } from "react";
import { AdSetBreakdown } from "user/analytics/search/AdSetBreakdown";
import { MetricsList } from "user/analytics/search/MetricsList";
import { OverTimeGraph } from "user/analytics/search/OverTimeGraph";
import { useMetricSelection } from "user/analytics/search/hooks";
import { ReportMenu } from "user/reporting/ReportMenu";
import dayjs from "dayjs";

interface Props {
  campaignSummary: CampaignSummaryFragment;
}

export function SearchCampaignReportView({ campaignSummary }: Props) {
  const { forceDefaultMetricSelection } = useMetricSelection();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const [startDate, setStartDate] = useState(dayjs(campaignSummary.startAt));
  const [endDate, setEndDate] = useState(dayjs().utc().endOf("day"));

  const filter: PerformanceFilter = {
    campaignIds: [campaignSummary.id],
    from: startDate.toISOString(),
    to: endDate.toISOString(),
  };

  const { data, error } = useFetchDailyMetricsForCampaignQuery({
    variables: {
      filter,
    },
  });

  if (isFirstLoad) {
    setIsFirstLoad(false);
    forceDefaultMetricSelection();
  }

  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails={msg`Unable to retrieve reporting data for this Campaign.`}
      />
    );
  }

  return (
    <>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <DashboardButton />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          marginLeft="auto"
          gap="5px"
        >
          <DateRangePicker
            from={startDate}
            to={endDate}
            onFromChange={setStartDate}
            onToChange={setEndDate}
          />

          <ReportMenu
            hasVerifiedConversions={false}
            campaignId={campaignSummary.id}
          />
        </Box>
      </Box>

      <Box
        // these control the layout of this elements contained within this box
        //  see https://css-tricks.com/snippets/css/complete-guide-grid/
        // on small screens the grid will have a single column, so the metrics are listed below
        // the graph. On larger screens the metrics are in a column to the right of the graph
        // (slightly more spaced out on even bigger screens).
        display="grid"
        gap={1}
        gridTemplateColumns={{ xs: "1fr", md: "300px 1fr", lg: "350px 1fr" }}
        gridTemplateAreas={{
          xs: `
        "graph"
        "metrics"
        `,
          md: `
          "metrics graph"
        `,
        }}
      >
        <Box gridArea="graph" bgcolor="white">
          <Stack direction="row" spacing={2} p={2} alignItems="center">
            <Typography variant="h2">{campaignSummary.name}</Typography>
            <Status
              state={campaignSummary.state}
              start={campaignSummary.startAt}
              end={campaignSummary.endAt}
            />
          </Stack>
          <OverTimeGraph dataSource={data?.performance?.values} />
        </Box>

        <Box gridArea="metrics" sx={{ overflowY: "scroll" }}>
          <MetricsList
            dataSource={data?.performance?.total?.metrics}
            campaign={campaignSummary}
          />
        </Box>
      </Box>

      <CardContainer header={<Trans>AdSets</Trans>}>
        <AdSetBreakdown campaignSummary={campaignSummary} filter={filter} />
      </CardContainer>
    </>
  );
}
