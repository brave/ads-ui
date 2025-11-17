import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FilterContext } from "@/state/context";
import {
  AdvertiserCampaignsDocument,
  CampaignFormat,
  CampaignSource,
  CampaignSummaryFragment,
} from "@/graphql-client/graphql";
import { useMutation } from "@apollo/client";
import { graphql } from "@/graphql-client/index";

interface Props {
  campaign?: CampaignSummaryFragment;
  disabled?: boolean;
}

const Copy_Campaign = graphql(`
  mutation CopyCampaign($id: String!) {
    copyCampaign(id: $id) {
      id
      state
    }
  }
`);

export function CloneCampaign({ campaign, disabled }: Props) {
  const { advertiser } = useAdvertiser();
  const { fromDate } = useContext(FilterContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const unableToClone = "Unable to clone campaign";

  const [copyCampaign, { loading }] = useMutation(Copy_Campaign, {
    refetchQueries: [
      {
        query: AdvertiserCampaignsDocument,
        variables: {
          id: advertiser.id,
          filter: { from: fromDate?.toISOString() },
        },
      },
    ],
    onCompleted(data) {
      history.push(
        `/user/main/adsmanager/advanced/${data.copyCampaign.id}/settings`,
      );
      setOpen(false);
    },
    onError() {
      alert(unableToClone);
    },
  });

  const canClone =
    campaign &&
    campaign.source === CampaignSource.SelfServe &&
    [CampaignFormat.PushNotification].includes(campaign.format);
  const campaignName = campaign?.name;
  return (
    <Box>
      <Tooltip
        title={
          !campaign ? "Select one campaign to clone" : `Clone ${campaignName}`
        }
      >
        <span>
          <Button
            color="primary"
            variant="text"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            disabled={!canClone || loading || disabled}
            startIcon={<ContentCopyIcon />}
          >
            Clone
          </Button>
        </span>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{`Clone campaign: ${campaignName}?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cloning a campaign will create a new draft campaign that inherits
            all properties of the original campaign, including ad sets. The new
            campaign will reuse any existing ads from the original campaign.
          </DialogContentText>
          {loading && <LinearProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            disabled={loading && !campaign}
            onClick={(e) => {
              e.preventDefault();
              if (campaign) {
                copyCampaign({ variables: { id: campaign.id } });
              }
            }}
          >
            Clone
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
