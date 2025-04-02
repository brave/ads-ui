import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import tweetnacl from "tweetnacl";
import { useRef, useState } from "react";
import { IAdvertiser } from "@/auth/context/auth.interface";
import { CardContainer } from "@/components/Card/CardContainer";
import { modalStyles } from "@/theme";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { useMutation } from "@apollo/client";
import { Advertiser_Update } from "@/auth/components/AdvertiserDetailsForm";

interface Props {
  advertiser: IAdvertiser;
}

export function NewKeyPairModal({ advertiser }: Props) {
  const [saving, setSaving] = useState(false);
  const { _ } = useLingui();
  const publicKey = useRef<string | null>(advertiser.publicKey);
  const [newPublicKey, setNewPublicKey] = useState("");
  const [newPrivateKey, setNewPrivateKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [showNewKeypairModal, setShowNewKeypairModal] = useState(false);
  const [newKeypairModalState, setNewKeypairModalState] =
    useState("disclaimer");

  const [updateAdvertiser] = useMutation(Advertiser_Update, {
    variables: {
      input: {
        id: advertiser.id,
        publicKey: publicKey.current,
      },
    },
    onCompleted() {
      publicKey.current = newPublicKey;
      setPrivateKey("");
      setNewPrivateKey("");
      closeNewKeypairModal();
      window.location.reload();
    },
    onError() {
      alert(_(msg`Unable to update Advertiser.`));
    },
  });

  const saveKeypair = () => {
    setSaving(true);
    updateAdvertiser({
      variables: {
        input: {
          id: advertiser.id,
          publicKey: newPublicKey,
        },
      },
    });
  };

  const openNewKeypairModal = () => {
    const keypair = tweetnacl.box.keyPair();
    const publicKey = btoa(
      String.fromCharCode.apply(null, keypair.publicKey as unknown as number[]),
    );
    const privateKey = btoa(
      String.fromCharCode.apply(null, keypair.secretKey as unknown as number[]),
    );
    setNewPublicKey(publicKey);
    setPrivateKey(privateKey);
    setShowNewKeypairModal(true);
  };

  const closeNewKeypairModal = () => {
    setNewKeypairModalState("disclaimer");
    setShowNewKeypairModal(false);
  };

  return (
    <>
      <CardContainer header={_(msg`Account Settings`)}>
        <Typography variant="h6" gutterBottom>
          <Trans>Keypairs</Trans>
        </Typography>

        <Typography>
          <Trans>
            Generate a keypair for your account. Brave Ads will use your
            account&rsquo;s public key to sign and encrypt conversion data. Only
            your organization will have access to the private key, which can be
            used to decrypt and view conversion data.
          </Trans>
        </Typography>

        {publicKey.current !== "" && (
          <Box marginTop={1}>
            <Typography>
              <Trans>Your account&rsquo;s public key:</Trans>
            </Typography>
            <Box component="pre" marginY={0}>
              {publicKey.current}
            </Box>
          </Box>
        )}
        <Box>
          <Button
            onClick={() => openNewKeypairModal()}
            variant="contained"
            style={{
              marginTop: "22px",
              width: "300px",
              alignSelf: "center",
            }}
          >
            <Trans>New Keypair</Trans>
          </Button>
        </Box>
      </CardContainer>

      <Modal open={showNewKeypairModal} onClose={() => closeNewKeypairModal()}>
        <Box sx={modalStyles}>
          {newKeypairModalState === "disclaimer" && (
            <Box maxWidth={600}>
              <Typography variant="h6" color="primary" gutterBottom>
                <Trans>Create new keypair?</Trans>
              </Typography>

              <Typography>
                <Trans>
                  You are attempting to create a new keypair, this will replace
                  any of your account&rsquo;s existing keypairs. Please note,
                  previous keypairs cannot be retrieved or used once replaced.
                </Trans>
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                marginTop={4}
              >
                <Button variant="outlined" onClick={closeNewKeypairModal}>
                  <Trans>Cancel</Trans>
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setNewKeypairModalState("privateKey")}
                >
                  <Trans>Continue</Trans>
                </Button>
              </Stack>
            </Box>
          )}
          {newKeypairModalState === "privateKey" && (
            <Box maxWidth={600}>
              <Typography variant="h6" color="primary" gutterBottom>
                <Trans>Create new keypair?</Trans>
              </Typography>

              <Typography gutterBottom>
                <Trans>Your account&rsquo;s new private key will be:</Trans>
              </Typography>

              <TextField
                value={privateKey}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                sx={{ bgcolor: "#fafafa" }}
              />

              <Typography mt={2} gutterBottom>
                <Trans>Copy this and keep this safe!</Trans>
              </Typography>
              <Typography>
                <Trans>
                  Brave cannot recover this key, which has been generated in
                  your browser. You will need to confirm this private key on the
                  next step before changes are saved.
                </Trans>
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                marginTop={4}
              >
                <Button variant="outlined" onClick={closeNewKeypairModal}>
                  <Trans>Cancel</Trans>
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setNewKeypairModalState("confirmation")}
                >
                  <Trans>Continue</Trans>
                </Button>
              </Stack>
            </Box>
          )}
          {newKeypairModalState === "confirmation" && (
            <Box maxWidth={600}>
              <Typography variant="h6" color="primary" gutterBottom>
                <Trans>Create new keypair?</Trans>
              </Typography>

              <Typography gutterBottom>
                <Trans>
                  Please confirm your account&rsquo;s new private key:
                </Trans>
              </Typography>

              <TextField
                value={newPrivateKey}
                fullWidth
                onChange={(e) => setNewPrivateKey(e.target.value)}
              />

              <Typography gutterBottom marginTop={2}>
                <Trans>
                  Once confirmed, your account&rsquo;s keypair will be replaced
                  with the new keypair.
                </Trans>
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                marginTop={4}
              >
                <Button variant="outlined" onClick={closeNewKeypairModal}>
                  <Trans>Cancel</Trans>
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => saveKeypair()}
                  disabled={saving || privateKey !== newPrivateKey}
                >
                  {saving ? <Trans>Saving...</Trans> : <Trans>Save</Trans>}
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
