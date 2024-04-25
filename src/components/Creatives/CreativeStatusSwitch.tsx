import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemText,
  Switch,
  Typography,
} from "@mui/material";
import { useState } from "react";
import _ from "lodash";
import { validCreativeFields } from "@/user/library";
import { isReviewableState } from "@/util/displayState";
import { Trans } from "@lingui/macro";
import {
  AdvertiserCreativesDocument,
  CampaignsForCreativeDocument,
  CreativeFragment,
  UpdateCreativeDocument,
} from "@/graphql-client/graphql";
import { useLazyQuery, useMutation } from "@apollo/client";

interface Props {
  creative: CreativeFragment;
}

export type RelatedCampaign = { id: string; name: string; state: string };
export function CreativeStatusSwitch({ creative }: Props) {
  const { advertiser } = useAdvertiser();
  const input = _.omit(validCreativeFields(creative, advertiser.id), [
    "targetUrlValid",
    "included",
    "id",
  ]);
  const [relatedCampaigns, setRelatedCampaigns] = useState<RelatedCampaign[]>(
    [],
  );
  const [creativeState, setCreativeState] = useState(input.state);
  const [update, { loading: updateLoading }] = useMutation(
    UpdateCreativeDocument,
    {
      refetchQueries: [
        {
          query: AdvertiserCreativesDocument,
          variables: { advertiserId: advertiser.id },
        },
        {
          query: CampaignsForCreativeDocument,
          variables: {
            creativeId: creative.id,
            advertiserId: advertiser.id,
          },
        },
      ],
      onCompleted() {
        setRelatedCampaigns([]);
      },
    },
  );
  const [campaigns, { loading }] = useLazyQuery(CampaignsForCreativeDocument, {
    variables: { creativeId: creative.id, advertiserId: advertiser.id },
  });

  if (input.state !== "active" && input.state !== "paused") {
    return <Typography>-</Typography>;
  }

  return (
    <Box>
      <Switch
        onChange={(e) => {
          const theState = e.target.checked ? "active" : "paused";
          setCreativeState(theState);
          campaigns({
            onCompleted(data) {
              const campaigns = data.creativeCampaigns.filter(
                (c) => !isReviewableState(c.state),
              );
              if (campaigns.length > 1) {
                setRelatedCampaigns(_.uniqBy(campaigns, "id"));
              } else {
                update({
                  variables: {
                    id: creative.id,
                    input: { ...input, state: theState },
                  },
                });
              }
            },
          });
        }}
        checked={creative.state === "active"}
        disabled={loading || updateLoading}
      />
      <Dialog open={relatedCampaigns.length > 0}>
        <DialogTitle>
          {creative.state === "active" ? (
            <Trans>Are you sure you want to pause</Trans>
          ) : (
            <Trans>Are you sure you want to activate</Trans>
          )}
          {` "${input.name}"`}
        </DialogTitle>
        <DialogContent>
          <Typography>
            <Trans>
              Modifying the state of this ad will effect more than one campaign:
            </Trans>
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 2 }}>
            {relatedCampaigns.map((r) => (
              <ListItemText
                sx={{ display: "list-item" }}
                primary={r.name}
                key={r.id}
              />
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setRelatedCampaigns([]);
            }}
            disabled={updateLoading}
          >
            <Trans>Cancel</Trans>
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              update({
                variables: {
                  id: creative.id,
                  input: { ...input, state: creativeState },
                },
              });
            }}
            disabled={updateLoading}
          >
            <Trans>Continue</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
