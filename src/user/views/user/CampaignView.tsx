import { Box, Chip, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { useAdvertiserCampaignsQuery } from "graphql/advertiser.generated";
import { CampaignAgeFilter } from "components/Campaigns/CampaignAgeFilter";
import { CampaignList } from "user/campaignList/CampaignList";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { CardContainer } from "components/Card/CardContainer";
import MiniSideBar from "components/Drawer/MiniSideBar";
import { useLoadCampaignQuery } from "graphql/campaign.generated";
import { CampaignFormat, CampaignSource } from "graphql/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Link as RouterLink } from "react-router-dom";
import { CloneCampaign } from "components/Campaigns/CloneCampaign";
import EditIcon from "@mui/icons-material/Edit";
import { FilterContext } from "state/context";

export function CampaignView() {
  const { advertiser } = useAdvertiser();
  const { fromDate } = useContext(FilterContext);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const advertiserCanAction =
    advertiser.selfServiceCreate && advertiser.selfServiceEdit;

  const handleCampaignSelect = useCallback(
    (c: string, include: boolean) => {
      const indexOfId = selectedCampaigns.findIndex((summary) => c === summary);
      if (include && indexOfId === -1) {
        setSelectedCampaigns([...selectedCampaigns, c]);
      } else if (!include && indexOfId >= 0) {
        const res =
          selectedCampaigns.length === 1
            ? []
            : selectedCampaigns.splice(indexOfId, 1);
        setSelectedCampaigns(res);
      }
    },
    [selectedCampaigns],
  );

  const { loading, data, error } = useAdvertiserCampaignsQuery({
    variables: {
      id: advertiser.id,
      filter: { from: fromDate },
    },
    pollInterval: 60_000,
    initialFetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
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
        header={
          advertiserCanAction ? (
            <CampaignHeader selectedCampaigns={selectedCampaigns} />
          ) : (
            "Campaigns"
          )
        }
        sx={{
          flexGrow: 1,
          overflowX: "auto",
        }}
        additionalAction={<CampaignAgeFilter disabled={loading} />}
      >
        {!loading ? (
          <CampaignList
            advertiser={data?.advertiserCampaigns}
            onCampaignSelect={handleCampaignSelect}
            selectedCampaigns={selectedCampaigns}
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

function CampaignHeader(props: { selectedCampaigns: string[] }) {
  const editableCampaigns = [
    CampaignFormat.PushNotification,
    CampaignFormat.NewsDisplayAd,
  ];
  const oneCampaignSelected = props.selectedCampaigns.length === 1;
  const firstCampaign = oneCampaignSelected ? props.selectedCampaigns[0] : null;
  const { data, loading } = useLoadCampaignQuery({
    variables: { id: firstCampaign ?? "" },
    skip: !oneCampaignSelected || !firstCampaign,
  });

  let canClone = false;
  let canEdit = false;
  if (!loading && data?.campaign) {
    canClone =
      data.campaign.source === CampaignSource.SelfServe &&
      editableCampaigns.includes(data.campaign.format);
    canEdit = canClone && data.campaign.state !== "completed";
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="h2">Campaigns</Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Tooltip title={canClone ? "Clone Campaign" : "Cannot clone campaign"}>
          <span>
            <CloneCampaign
              campaignFragment={data?.campaign}
              useChip
              disabled={!oneCampaignSelected || !data?.campaign || !canClone}
            />
          </span>
        </Tooltip>
        <Tooltip title={canEdit ? "Edit campaign" : "Cannot Edit Campaign"}>
          <span>
            <Chip
              color="primary"
              label="Edit"
              disabled={!oneCampaignSelected || !data?.campaign || !canEdit}
              component={RouterLink}
              to={`/user/main/adsmanager/advanced/${firstCampaign}/settings`}
              icon={<EditIcon fontSize="small" />}
              clickable
            />
          </span>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
