import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { createSession } from "checkout/lib";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useHistory } from "react-router-dom";

const customStyles = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "1px solid #e2e2e2",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  onCancel: () => void;
  campaignId: string;
  isEdit?: boolean;
}

export function PaymentModal({ open, onCancel, campaignId, isEdit }: Props) {
  const [selected, setSelected] = useState(0);
  const [agreed, setAgreed] = useState(selected === 0);
  const [loading, setLoading] = useState(false);
  const { advertiser } = useAdvertiser();
  const history = useHistory();

  return (
    <Modal open={open}>
      <Box sx={customStyles}>
        <Typography variant="h5" sx={{ textAlign: "left", mb: 2 }}>
          Payment Options
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "left", mb: 2 }}>
          To launch a campaign with Brave, you are required to pre-pay the full
          amount you intend to spend.
        </Typography>
        <List>
          <ListItemButton
            selected={selected === 0}
            onClick={() => {
              setSelected(0);
              setAgreed(true);
            }}
            sx={{
              p: 2,
              border: "1px solid #e2e2e2",
              mb: 1,
            }}
          >
            <ListItemText primary="Pay with Stripe" />
          </ListItemButton>
          <ListItemButton
            selected={selected === 1}
            onClick={() => {
              setSelected(1);
              setAgreed(false);
            }}
            sx={{
              p: 2,
              border: "1px solid #e2e2e2",
              mt: 1,
            }}
          >
            <ListItemText primary="Pay with BAT" />
          </ListItemButton>
        </List>

        {selected === 1 && (
          <FormGroup sx={{ mt: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
              }
              label="I agree that pre-paying with BAT is a manual process, and that if my payment cannot be verified this campaign will not run."
              sx={{ textAlign: "left" }}
            />
          </FormGroup>
        )}

        <Stack direction="row" spacing={1} sx={{ mt: 2 }} alignItems="center">
          <Button
            variant="outlined"
            onClick={() => {
              if (!isEdit) {
                history.push(`/user/main/adsmanager/advanced/${campaignId}`);
              }
              onCancel();
            }}
            disabled={loading}
          >
            Cancel
          </Button>

          <LoadingButton
            loading={loading}
            disabled={loading || !agreed}
            variant="contained"
            onClick={async () => {
              setLoading(true);
              if (selected === 0) {
                await createSession(advertiser.id, campaignId ?? "")
                  .then((url) => {
                    window.location.replace(url);
                  })
                  .catch((e) => {
                    alert("Unable to create Campaign");
                    setLoading(false);
                    history.push(
                      `/user/main/adsmanager/advanced/${campaignId}`
                    );
                    onCancel();
                  });
              } else {
                history.push(
                  `/user/main/complete/new?referenceId=${campaignId}`
                );
              }
            }}
          >
            Pay with {selected === 0 ? "Stripe" : "BAT"}
          </LoadingButton>
        </Stack>
      </Box>
    </Modal>
  );
}
