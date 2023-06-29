import { Box, Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useAdvertiserCampaignsQuery } from "graphql/advertiser.generated";
import { CampaignAgeFilter } from "components/Campaigns/CampaignAgeFilter";
import { CampaignList } from "user/campaignList/CampaignList";
import { ErrorDetail } from "components/Error/ErrorDetail";
import moment from "moment/moment";
import { CardContainer } from "components/Card/CardContainer";

export function CampaignView() {
  const [fromDateFilter, setFromDateFilter] = useState<Date | null>(
    moment().subtract(6, "month").startOf("day").toDate()
  );

  const { loading, data, error } = useAdvertiserCampaignsQuery({
    variables: {
      id: window.localStorage.getItem("activeAdvertiser") ?? "",
      filter: { from: fromDateFilter },
    },
    pollInterval: 60_000,
    fetchPolicy: "cache-and-network",
  });

  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails="Unable to retrieve Campaign data."
      />
    );
  }

  return (
    <Box display="flex" flexDirection="column" sx={{ mb: 2, ml: 5, mr: 5 }}>
      <CardContainer
        header="Campaigns"
        additionalAction={
          <CampaignAgeFilter
            fromDate={fromDateFilter}
            onChange={setFromDateFilter}
            disabled={loading}
          />
        }
      >
        {!loading ? (
          <CampaignList
            advertiser={data?.advertiserCampaigns}
            fromDate={fromDateFilter}
          />
        ) : (
          <Box m={3}>
            <Skeleton variant="rounded" height={500} />
          </Box>
        )}
      </CardContainer>
    </Box>
  );
}
