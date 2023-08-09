import { Box, Skeleton } from "@mui/material";
import React, { useState } from "react";
import { useAdvertiserCampaignsQuery } from "graphql/advertiser.generated";
import { CampaignAgeFilter } from "components/Campaigns/CampaignAgeFilter";
import { CampaignList } from "user/campaignList/CampaignList";
import { ErrorDetail } from "components/Error/ErrorDetail";
import moment from "moment/moment";
import { CardContainer } from "components/Card/CardContainer";
import MiniSideBar from "components/Drawer/MiniSideBar";

export function CampaignView() {
  const [fromDateFilter, setFromDateFilter] = useState<Date | null>(
    moment().subtract(6, "month").startOf("day").toDate(),
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
    <MiniSideBar>
      <CardContainer
        header="Campaigns"
        sx={{
          flexGrow: 1,
          mr: 2,
        }}
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
    </MiniSideBar>
  );
}
