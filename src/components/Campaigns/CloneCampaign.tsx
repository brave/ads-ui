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
import {
  CampaignSummaryFragment,
  useCreateCampaignMutation,
  useLoadCampaignLazyQuery,
} from "graphql/campaign.generated";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { refetchAdvertiserCampaignsQuery } from "graphql/advertiser.generated";
import { createCampaignFromFragment } from "form/fragmentUtil";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useUser } from "auth/hooks/queries/useUser";
import { FilterContext } from "state/context";
import { CampaignFormat, CampaignSource } from "graphql/types";

interface Props {
  campaign?: CampaignSummaryFragment;
  disabled?: boolean;
}

export function CloneCampaign({ campaign, disabled }: Props) {
  const { advertiser } = useAdvertiser();
  const { fromDate } = useContext(FilterContext);
  const { userId } = useUser();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [getCampaign, { loading: getLoading }] = useLoadCampaignLazyQuery();
  const [copyCampaign, { loading }] = useCreateCampaignMutation({
    refetchQueries: [
      {
        ...refetchAdvertiserCampaignsQuery({
          id: advertiser.id,
          filter: { from: fromDate },
        }),
      },
    ],
    onCompleted(data) {
      history.push(
        `/user/main/adsmanager/advanced/${data.createCampaign.id}/settings`,
      );
    },
    onError() {
      alert(`Unable to clone campaign`);
    },
  });

  const doClone = async () => {
    if (campaign) {
      void getCampaign({
        variables: { id: campaign.id },
        onCompleted(data) {
          if (data.campaign) {
            void copyCampaign({
              variables: {
                input: createCampaignFromFragment(data.campaign, userId),
              },
            });
          } else {
            alert("Unable to clone campaign");
          }
        },
      });
    }
  };

  const canClone =
    campaign &&
    campaign.source === CampaignSource.SelfServe &&
    [CampaignFormat.PushNotification, CampaignFormat.NewsDisplayAd].includes(
      campaign.format,
    );
  return (
    <Box>
      <Tooltip
        title={
          !campaign ? "Select one campaign to clone" : `Clone ${campaign.name}`
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
            disabled={!canClone || loading || getLoading || disabled}
            startIcon={<ContentCopyIcon />}
          >
            Clone
          </Button>
        </span>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{`Copy campaign: "${campaign?.name}"?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cloning a campaign will take all properties including ad sets and
            ads, and create a new draft campaign with them.
          </DialogContentText>
          {(loading || getLoading) && <LinearProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            disabled={loading || getLoading}
            onClick={(e) => {
              e.preventDefault();
              void doClone();
            }}
          >
            Clone
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
