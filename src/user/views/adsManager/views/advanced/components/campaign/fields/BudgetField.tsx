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
import { useIncreaseCampaignBudget } from "@/checkout/hooks/useIncreaseCampaignBudget";
import { useState } from "react";
import { formatUsd } from "@/user/library/format";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";

export function BudgetField() {
  const { isDraft } = useIsEdit();
  const { data } = useAdvertiserWithPrices();
  const { values, errors } = useFormikContext<CampaignForm>();
  const { advertiser } = useAdvertiser();

  return (
    <Stack direction="row" alignItems="baseline" spacing={1} mt={1} mb={2}>
      <FormikTextField
        name="budget"
        label={"Lifetime Budget"}
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
      {values.id && !advertiser.selfServiceSetPrice && (
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
      alert("Please enter a valid amount");
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
        Increase Budget
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Increase budget for campaign: <strong>{campaignName}</strong>?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Like your campaign's performance? Increase the budget to expand its
            reach and connect with more potential customers. Specify below how
            much you would like to add to your current budget of{" "}
            <strong>{previousBudget}</strong>
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
            Cancel
          </Button>
          <Button
            onClick={() => doSubmit()}
            disabled={loading}
            variant="contained"
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
