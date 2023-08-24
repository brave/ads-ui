import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import {
  CampaignFragment,
  useCreateCampaignMutation,
} from "graphql/campaign.generated";
import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";
import { refetchAdvertiserCampaignsQuery } from "graphql/advertiser.generated";
import { createCampaignFromFragment } from "form/fragmentUtil";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useUser } from "auth/hooks/queries/useUser";
import { FilterContext } from "state/context";

interface Props {
  campaignFragment?: CampaignFragment | null;
  useChip?: boolean;
}

export function CloneCampaign({ campaignFragment, useChip }: Props) {
  const { advertiser } = useAdvertiser();
  const { fromDate } = useContext(FilterContext);
  const { userId } = useUser();
  const history = useHistory();
  const [open, setOpen] = useState(false);

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

  return (
    <Box>
      {useChip ? (
        <Chip
          color="primary"
          label="Clone"
          onClick={() => {
            setOpen(true);
          }}
          disabled={loading || !campaignFragment}
          icon={<ContentCopyIcon fontSize="small" />}
        />
      ) : (
        <Button
          color="primary"
          variant="text"
          size="small"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          disabled={loading || !campaignFragment}
          startIcon={<ContentCopyIcon />}
        >
          Clone Campaign
        </Button>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{`Copy campaign: "${campaignFragment?.name}"?`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Copying a campaign will take all properties including ad sets and
            ads, and create a new draft campaign with them.
          </DialogContentText>
          {loading && <LinearProgress />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              if (campaignFragment) {
                copyCampaign({
                  variables: {
                    input: createCampaignFromFragment(campaignFragment, userId),
                  },
                });
              } else {
                alert("No campaign selected");
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
