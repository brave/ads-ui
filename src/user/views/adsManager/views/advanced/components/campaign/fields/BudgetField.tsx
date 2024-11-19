import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { FormikTextField, useIsEdit } from "@/form/FormikHelpers";
import { useFormikContext } from "formik";
import { CampaignForm } from "../../../../../types";
import { useAdvertiserWithPrices } from "@/user/hooks/useAdvertiserWithPrices";
import { useLingui } from "@lingui/react";
import { msg, t, Trans } from "@lingui/macro";
import { useIncreaseCampaignBudget } from "@/checkout/hooks/useIncreaseCampaignBudget";
import { useState } from "react";
import { formatUsd } from "@/user/library/format";

export function BudgetField() {
  const { isDraft } = useIsEdit();
  const { _ } = useLingui();
  const { data } = useAdvertiserWithPrices();
  const { values, errors } = useFormikContext<CampaignForm>();

  return (
    <Stack direction="row" alignItems="baseline" spacing={1} mt={1} mb={2}>
      <FormikTextField
        name="budget"
        label={_(msg`Lifetime Budget`)}
        margin="normal"
        type="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
          endAdornment: (
            <InputAdornment position="end">{values.currency}</InputAdornment>
          ),
        }}
        helperText={errors.budget}
        error={!!errors.budget}
        disabled={!isDraft && !data.selfServiceSetPrice}
      />
      {values.id && (
        <IncreaseBudgetDialog
          campaignId={values.id}
          campaignName={values.name}
          currentBudget={values.budget}
        />
      )}
    </Stack>
  );
}

interface Props {
  campaignId: string;
  campaignName: string;
  currentBudget: number;
}

function IncreaseBudgetDialog({
  campaignId,
  campaignName,
  currentBudget,
}: Props) {
  const { createPaymentSession, loading } = useIncreaseCampaignBudget();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("0");

  const doSubmit = () => {
    const parsed = parseInt(amount);
    if (isNaN(parsed) || parsed <= 0) {
      alert(t`Please enter a valid amount`);
    }

    void createPaymentSession(campaignId, parsed.toString());
  };

  const previousBudget = formatUsd(currentBudget);
  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{ width: "250px", pt: 1, pb: 1, borderRadius: "16px" }}
      >
        <Trans>Increase Budget</Trans>
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Trans>
            Increase budget for campaign: <strong>{campaignName}</strong>?
          </Trans>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Trans>
              Like your campaign's performance? Increase the budget to expand
              its reach and connect with more potential customers. Specify below
              how much you would like to add to your current budget of{" "}
              <strong>{previousBudget}</strong>
            </Trans>
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="normal"
            name="amount"
            fullWidth
            variant="filled"
            value={amount}
            onChange={(e) => setAmount(e.currentTarget.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              },
            }}
            sx={{ mt: 2, mb: 1 }}
            type="number"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            disabled={loading}
            variant="outlined"
          >
            <Trans>Cancel</Trans>
          </Button>
          <Button
            onClick={() => doSubmit()}
            disabled={loading}
            variant="contained"
          >
            <Trans>Continue</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
