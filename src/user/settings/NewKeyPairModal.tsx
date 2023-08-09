import {
  Box,
  Button,
  Modal,
  Stack,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { useUpdateAdvertiserMutation } from "graphql/advertiser.generated";
import * as tweetnacl from "tweetnacl";
import { useRef, useState } from "react";
import { IAdvertiser } from "auth/context/auth.interface";
import { CardContainer } from "components/Card/CardContainer";

const modalStyles: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #e2e2e2",
  boxShadow: 24,
  borderRadius: "4px",
  p: 4,
};

interface Props {
  advertiser: IAdvertiser;
}

export function NewKeyPairModal({ advertiser }: Props) {
  const [saving, setSaving] = useState(false);
  const publicKey = useRef<string | null>();
  publicKey.current = advertiser.publicKey;
  const [newPublicKey, setNewPublicKey] = useState("");
  const [newPrivateKey, setNewPrivateKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [showNewKeypairModal, setShowNewKeypairModal] = useState(false);
  const [newKeypairModalState, setNewKeypairModalState] =
    useState("disclaimer");

  const [updateAdvertiser] = useUpdateAdvertiserMutation({
    variables: {
      updateAdvertiserInput: {
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
      alert("Unable to update Advertiser.");
    },
  });

  const saveKeypair = () => {
    setSaving(true);
    updateAdvertiser({
      variables: {
        updateAdvertiserInput: {
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
      <CardContainer header="Account Settings">
        <Typography variant="h6" gutterBottom>
          Keypairs
        </Typography>

        <Typography>
          Generate a keypair for your organization. Brave Ads will use your
          organization's public key to sign and encrypt conversion data. Only
          your organization will have access to the private key, which can be
          used to decrypt and view conversion data.
        </Typography>

        {publicKey.current !== "" && (
          <Box marginTop={1}>
            <Typography>Your organization's public key:</Typography>
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
            New Keypair
          </Button>
        </Box>
      </CardContainer>

      <Modal open={showNewKeypairModal} onClose={() => closeNewKeypairModal()}>
        <Box sx={modalStyles}>
          {newKeypairModalState === "disclaimer" && (
            <Box maxWidth={600}>
              <Typography variant="h6" color="primary" gutterBottom>
                Create new keypair?
              </Typography>

              <Typography>
                You are attempting to create a new keypair, this will replace
                any of your organization's existing keypairs. Please note,
                previous keypairs cannot be retrieved or used once replaced.
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                marginTop={4}
              >
                <Button variant="outlined" onClick={closeNewKeypairModal}>
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setNewKeypairModalState("privateKey")}
                >
                  Continue
                </Button>
              </Stack>
            </Box>
          )}
          {newKeypairModalState === "privateKey" && (
            <Box maxWidth={600}>
              <Typography variant="h6" color="primary" gutterBottom>
                Create new keypair?
              </Typography>

              <Typography gutterBottom>
                Your organization's new private key will be:
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
                Copy this and keep this safe!
              </Typography>
              <Typography>
                Brave cannot recover this key, which has been generated in your
                browser. You will need to confirm this private key on the next
                step before changes are saved.
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                marginTop={4}
              >
                <Button variant="outlined" onClick={closeNewKeypairModal}>
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setNewKeypairModalState("confirmation")}
                >
                  Continue
                </Button>
              </Stack>
            </Box>
          )}
          {newKeypairModalState === "confirmation" && (
            <Box maxWidth={600}>
              <Typography variant="h6" color="primary" gutterBottom>
                Create new keypair?
              </Typography>

              <Typography gutterBottom>
                Please confirm your organization's new private key:
              </Typography>

              <TextField
                value={newPrivateKey}
                fullWidth
                onChange={(e) => setNewPrivateKey(e.target.value)}
              />

              <Typography gutterBottom marginTop={2}>
                Once confirmed, your organization's keypair will be replaced
                with the new keypair.
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                marginTop={4}
              >
                <Button variant="outlined" onClick={closeNewKeypairModal}>
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => saveKeypair()}
                  disabled={saving || privateKey !== newPrivateKey}
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
}
