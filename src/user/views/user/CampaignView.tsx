import { Box, Skeleton } from "@mui/material";
import { useContext } from "react";
import { CampaignAgeFilter } from "@/components/Campaigns/CampaignAgeFilter";
import { CampaignList } from "@/user/campaignList/CampaignList";
import { ErrorDetail } from "@/components/Error/ErrorDetail";
import { CardContainer } from "@/components/Card/CardContainer";
import MiniSideBar from "@/components/Drawer/MiniSideBar";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { FilterContext } from "@/state/context";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { Trans, msg } from "@lingui/macro";
import { AdvertiserCampaignsDocument } from "@/graphql-client/graphql";
import { useQuery } from "@apollo/client";

export function CampaignView() {
  useTrackMatomoPageView({ documentTitle: "Advertiser Campaigns" });
  const { advertiser } = useAdvertiser();
  const { fromDate } = useContext(FilterContext);

  const { loading, data, error } = useQuery(AdvertiserCampaignsDocument, {
    variables: {
      id: advertiser.id,
      filter: { from: fromDate?.toISOString() },
    },
    pollInterval: 60_000,
    initialFetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });

  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails={msg`Unable to retrieve Campaign data.`}
      />
    );
  }

  return (
    <MiniSideBar>
      <CardContainer
        header={<Trans>Campaigns</Trans>}
        sx={{
          flexGrow: 1,
          overflowX: "auto",
        }}
        additionalAction={<CampaignAgeFilter disabled={loading} />}
      >
        {!loading ? (
          <CampaignList advertiser={data?.advertiserCampaigns} />
        ) : (
          <Box m={3}>
            <Skeleton variant="rounded" height={500} />
          </Box>
        )}
      </CardContainer>
    </MiniSideBar>
  );
}
