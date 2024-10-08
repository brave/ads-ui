import { graphql } from "@/graphql-client/index";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { modalStyles } from "@/theme";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { useMutation } from "@apollo/client";
import BigNumber from "bignumber.js";
import { Trans } from "@lingui/macro";
import { useHistory } from "react-router-dom";
import { FilterContext } from "@/state/context";
import {
  AdvertiserCampaignsDocument,
  CampaignSummaryFragment,
} from "@/graphql-client/graphql";
import CancelIcon from "@mui/icons-material/Cancel";

const ForceCampaignComplete = graphql(`
  mutation ForceCampaignComplete($id: String!) {
    forceCampaignCompletionAndTransferFunds(id: $id)
  }
`);

interface Props {
  campaign?: Pick<
    CampaignSummaryFragment,
    "id" | "hasInProcessOrCompleteTransfer" | "adsManagerCurrentBalance"
  >;
  type: "form" | "inline";
  disabled?: boolean;
}

export function CloseCampaignModal({ campaign, type, disabled }: Props) {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const { advertiser } = useAdvertiser();
  const { fromDate } = useContext(FilterContext);

  const [mutate, { loading: mutating }] = useMutation(ForceCampaignComplete, {
    variables: { id: campaign?.id ?? "" },
  });

  const isInline = type === "inline";
  const currentBalance = BigNumber(campaign?.adsManagerCurrentBalance ?? 0);
  const hasNoBalance = currentBalance.lte(0);
  if (!isInline && hasNoBalance) return null;
  const hasInProcessOrCompleteTransfer =
    campaign?.hasInProcessOrCompleteTransfer ?? false;

  const doMutate = () => {
    mutate({
      refetchQueries: [
        {
          query: AdvertiserCampaignsDocument,
          variables: {
            id: advertiser.id,
            filter: { from: fromDate?.toISOString() },
          },
        },
      ],
      onCompleted: (data) => {
        if (window.confirm(data.forceCampaignCompletionAndTransferFunds)) {
          history.replace("/user/main/campaign");
        } else {
          window.location.reload();
        }
      },
    });
  };

  return (
    <>
      <Button
        variant={isInline ? "text" : "outlined"}
        color="error"
        size={isInline ? "small" : "medium"}
        disabled={
          mutating ||
          hasInProcessOrCompleteTransfer ||
          (isInline && hasNoBalance) ||
          disabled
        }
        sx={{ borderRadius: "12px" }}
        startIcon={isInline ? <CancelIcon /> : undefined}
        onClick={() => {
          setOpen(true);
        }}
      >
        {isInline && <Trans>Close</Trans>}
        {!isInline && <Trans>Close Campaign</Trans>}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            ...modalStyles,
            maxWidth: 600,
          }}
        >
          <Typography variant="h4" mb={2}>
            <Trans>You are about to close this campaign.</Trans>
          </Typography>

          <Typography variant="subtitle1" mb={2}>
            <Trans>
              Closing a campaign will immediately stop it from running. Once it
              has stopped running, any remaining funds will be transferred back
              to your account in 24-48 hours.
            </Trans>
          </Typography>

          <Stack direction="row" mt={2} spacing={2}>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Trans>Cancel</Trans>
            </Button>
            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                doMutate();
              }}
            >
              <Trans>Continue</Trans>
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
