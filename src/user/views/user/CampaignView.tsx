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
  const oneCampaignSelected = props.selectedCampaigns.length === 1;
  const firstCampaign = oneCampaignSelected ? props.selectedCampaigns[0] : null;
  const { data, loading } = useLoadCampaignQuery({
    variables: { id: firstCampaign ?? "" },
    skip: !oneCampaignSelected || !firstCampaign,
  });

  let tooltip: string | null = "Please select one campaign to clone or edit";
  let isValidCampaign = false;
  if (!loading && data?.campaign) {
    isValidCampaign =
      data.campaign.source === CampaignSource.SelfServe &&
      data.campaign.format === CampaignFormat.PushNotification &&
      data.campaign.state !== "completed";
    tooltip = isValidCampaign ? null : "Cannot edit this campaign";
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="h2">Campaigns</Typography>
      <Tooltip title={tooltip}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <CloneCampaign campaignFragment={data?.campaign} useChip />
          <Chip
            color="primary"
            label="Edit"
            disabled={
              !oneCampaignSelected || !data?.campaign || !isValidCampaign
            }
            component={RouterLink}
            to={`/user/main/adsmanager/advanced/${firstCampaign}/settings`}
            icon={<EditIcon fontSize="small" />}
            clickable
          />
        </Stack>
      </Tooltip>
    </Stack>
  );
}
