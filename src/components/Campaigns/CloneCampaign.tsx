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
import { createCampaignFromFragment } from "@/form/fragmentUtil";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { FilterContext } from "@/state/context";
import {
  AdvertiserCampaignsDocument,
  CampaignFormat,
  CampaignSource,
  CampaignSummaryFragment,
  CreateCampaignDocument,
  LoadCampaignDocument,
} from "@/graphql-client/graphql";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useLazyQuery, useMutation } from "@apollo/client";

interface Props {
  campaign?: CampaignSummaryFragment;
  disabled?: boolean;
}

export function CloneCampaign({ campaign, disabled }: Props) {
  const { advertiser } = useAdvertiser();
  const { fromDate } = useContext(FilterContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { _ } = useLingui();
  const unableToClone = _(msg`Unable to clone campaign`);

  const [getCampaign, { loading: getLoading }] =
    useLazyQuery(LoadCampaignDocument);
  const [copyCampaign, { loading }] = useMutation(CreateCampaignDocument, {
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
        `/user/main/adsmanager/advanced/${data.createCampaign.id}/settings`,
      );
    },
    onError() {
      alert(unableToClone);
    },
  });

  const doClone = async () => {
    if (campaign) {
      getCampaign({
        variables: { id: campaign.id },
        onCompleted(data) {
          if (data.campaign) {
            copyCampaign({
              variables: {
                input: createCampaignFromFragment(data.campaign),
              },
            });
          } else {
            alert(unableToClone);
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
  const campaignName = campaign?.name;
  return (
    <Box>
      <Tooltip
        title={
          !campaign
            ? _(msg`Select one campaign to clone`)
            : _(msg`Clone ${campaignName}`)
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
            <Trans>Clone</Trans>
          </Button>
        </span>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{_(msg`Clone campaign: "${campaignName}"?`)}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Trans>
              Cloning a campaign will take all properties including ad sets and
              ads, and create a new draft campaign with them.
            </Trans>
          </DialogContentText>
          {(loading || getLoading) && <LinearProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>
            <Trans>Cancel</Trans>
          </Button>
          <Button
            disabled={loading || getLoading}
            onClick={(e) => {
              e.preventDefault();
              doClone();
            }}
          >
            <Trans>Clone</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
