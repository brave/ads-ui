import React, { useState } from "react";
import { Text } from "components/Text/Text";
import {
  Button,
  Input,
  InputContainer,
} from "components/formElements/formElements";
import _ from "lodash";
import * as tweetnacl from "tweetnacl";
import { useUpdateAdvertiserMutation } from "graphql/advertiser.generated";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { setActiveAdvertiser } from "auth/util";

const modalStyles = {
  position: "absolute" as "absolute",
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

const Settings = () => {
  const { advertiser: activeAdvertiser, advertisers } = useAdvertiser();
  const [loading, setLoading] = useState(false);
  const [publicKey, setPublicKey] = useState(activeAdvertiser.publicKey);
  const [advertiserId, setAdvertiserId] = useState(activeAdvertiser.id);
  const [newPublicKey, setNewPublicKey] = useState("");
  const [newPrivateKey, setNewPrivateKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [showNewKeypairModal, setShowNewKeypairModal] = useState(false);
  const [newKeypairModalState, setNewKeypairModalState] =
    useState("disclaimer");

  const saveKeypair = () => {
    setLoading(true);
    updateAdvertiser({
      variables: {
        updateAdvertiserInput: {
          id: advertiserId,
          publicKey: newPublicKey,
        },
      },
    });
  };

  const handleUpdateAdvertiser = () => {
    setLoading(false);
    setPublicKey(newPublicKey);
    setPrivateKey("");
    setNewPrivateKey("");
    closeNewKeypairModal();
  };

  const openNewKeypairModal = () => {
    const keypair = tweetnacl.box.keyPair();
    const publicKey = btoa(
      String.fromCharCode.apply(null, keypair.publicKey as unknown as number[])
    );
    const privateKey = btoa(
      String.fromCharCode.apply(null, keypair.secretKey as unknown as number[])
    );
    setNewPublicKey(publicKey);
    setPrivateKey(privateKey);
    setShowNewKeypairModal(true);
  };

  const closeNewKeypairModal = () => {
    setNewKeypairModalState("disclaimer");
    setShowNewKeypairModal(false);
  };

  const [updateAdvertiser] = useUpdateAdvertiserMutation({
    variables: {
      updateAdvertiserInput: {
        id: advertiserId,
        publicKey: publicKey,
      },
    },
    onCompleted: handleUpdateAdvertiser,
  });

  const setActiveAdvertiserWithId = (e) => {
    const id = e.target.value;
    setAdvertiserId(id);
    const adv = _.find(advertisers, { id });
    setPublicKey(adv?.publicKey);
    setActiveAdvertiser(adv?.id);
  };

  return (
    <div>
      <Text
        content="Account Settings"
        fontFamily="Poppins"
        sizes={[22, 22, 22, 22, 22]}
      ></Text>
      <div style={{ marginTop: "48px", marginBottom: "48px" }}></div>

      <Text
        content="Keypairs"
        fontFamily="Poppins"
        sizes={[22, 22, 22, 22, 18]}
      ></Text>

      <Text
        style={{ marginTop: "28px" }}
        content={
          "Generate a keypair for your organization. Brave Ads will use your organization's public key to sign and encrypt conversion data. Only your organization will have access to the private key, which can be used to decrypt and view conversion data."
        }
        sizes={[16, 16, 15, 15, 13]}
        fontFamily={"Poppins"}
      />

      <div style={{ marginTop: "28px" }}></div>

      <div style={{ display: "flex" }}>
        <InputContainer style={{ width: "100%", marginRight: "24px" }}>
          {publicKey !== "" && (
            <>
              <div style={{ display: "flex" }}>
                <Text
                  content={"Your organization's public key:"}
                  sizes={[16, 16, 15, 15, 13]}
                  fontFamily={"Poppins"}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  marginTop: "22px",
                  textAlign: "center",
                  fontSize: 18,
                  fontFamily: "Poppins",
                  marginBottom: "6px",
                }}
              >
                {publicKey}
              </div>
            </>
          )}

          <Button
            onClick={() => openNewKeypairModal()}
            style={{
              height: "32px",
              marginTop: "22px",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#F8532BCC",
              width: "300px",
            }}
          >
            <Text
              content={"New Keypair"}
              style={{ paddingTop: "6px", paddingBottom: "6px" }}
              sizes={[16, 16, 15, 15, 14]}
              fontWeight={500}
              fontFamily={"Poppins"}
            />
          </Button>
        </InputContainer>
      </div>

      <div style={{ marginTop: "24px", marginBottom: "24px" }}></div>

      <Text
        content="Organization"
        fontFamily="Poppins"
        sizes={[22, 22, 22, 22, 18]}
      ></Text>

      <Text
        style={{ marginTop: "28px" }}
        content={
          "Choose which organization you would like to view, Brave Ads Users can belong to multiple organizations."
        }
        sizes={[16, 16, 15, 15, 13]}
        fontFamily={"Poppins"}
      />

      <div style={{ marginBottom: "28px" }}></div>

      <div style={{ height: "400px" }}>
        <InputContainer>
          <FormControl fullWidth>
            <InputLabel>Select Organization</InputLabel>
            <Select
              value={advertiserId}
              label="Select Organization"
              onChange={(e) => setActiveAdvertiserWithId(e)}
            >
              {advertisers.map((a) => (
                <MenuItem value={a.id}>{a.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </InputContainer>
      </div>

      <Modal open={showNewKeypairModal} onClose={() => closeNewKeypairModal()}>
        <Box sx={modalStyles}>
          {newKeypairModalState === "disclaimer" && (
            <div style={{ width: "600px" }}>
              <Text
                content={`Create new keypair?`}
                sizes={[16, 16, 15, 15, 22]}
                color={"#E0694C"}
                fontFamily={"Poppins"}
              />
              <Text
                style={{ marginTop: "42px" }}
                content={`You are attempting to create a new keypair, this will replace any of your organization's existing keypairs. Please note, previous keypairs cannot be retrieved or used once replaced.`}
                sizes={[16, 16, 15, 15, 16]}
                fontFamily={"Muli"}
              />
              <div
                style={{ display: "flex", width: "100%", marginTop: "42px" }}
              >
                <div
                  onClick={() => {
                    closeNewKeypairModal();
                  }}
                  style={{
                    marginLeft: "auto",
                    marginRight: "28px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0px 20px",
                    width: "100px",
                    border: "1px solid #e2e2e2",
                    borderRadius: "100px 100px 100px 100px",
                    cursor: "pointer",
                  }}
                >
                  <span>
                    <Text
                      style={{ paddingTop: "6px", paddingBottom: "6px" }}
                      sizes={[16, 16, 15, 15, 14]}
                      fontWeight={500}
                      fontFamily={"Poppins"}
                    >
                      Cancel
                    </Text>
                  </span>
                </div>
                <div
                  onClick={() => {
                    setNewKeypairModalState("privateKey");
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "0px 20px",
                    width: "100px",
                    background: "#F87454",
                    color: "white",
                    border: "none",
                    borderRadius: "100px 100px 100px 100px",
                    cursor: "pointer",
                  }}
                >
                  <span>
                    <Text
                      style={{ paddingTop: "6px", paddingBottom: "6px" }}
                      sizes={[16, 16, 15, 15, 14]}
                      fontWeight={500}
                      fontFamily={"Poppins"}
                    >
                      Continue
                    </Text>
                  </span>
                </div>
              </div>
            </div>
          )}
          {newKeypairModalState === "privateKey" && (
            <div style={{ width: "600px" }}>
              <Text
                content={`Create new keypair?`}
                sizes={[16, 16, 15, 15, 22]}
                color={"#E0694C"}
                fontFamily={"Poppins"}
              />
              <Text
                style={{ marginTop: "42px", marginBottom: "16px" }}
                content={`Your organization's new private key will be:`}
                sizes={[16, 16, 15, 15, 16]}
                fontFamily={"Muli"}
              />
              <Input value={privateKey}></Input>
              <Text
                style={{ marginTop: "28px", color: "#4C54D2" }}
                content={
                  "Keep this safe! Brave cannot recover this key. Please note, you will have a chance to confirm your private key before changes are saved."
                }
                sizes={[16, 16, 15, 15, 15]}
                fontFamily={"Poppins"}
              />
              <div
                style={{ display: "flex", width: "100%", marginTop: "42px" }}
              >
                <div
                  onClick={() => {
                    closeNewKeypairModal();
                  }}
                  style={{
                    marginLeft: "auto",
                    marginRight: "28px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0px 20px",
                    width: "100px",
                    border: "1px solid #e2e2e2",
                    borderRadius: "100px 100px 100px 100px",
                    cursor: "pointer",
                  }}
                >
                  <span>
                    <Text
                      style={{ paddingTop: "6px", paddingBottom: "6px" }}
                      sizes={[16, 16, 15, 15, 14]}
                      fontWeight={500}
                      fontFamily={"Poppins"}
                    >
                      Cancel
                    </Text>
                  </span>
                </div>
                <div
                  onClick={() => {
                    setNewKeypairModalState("confirmation");
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "0px 20px",
                    width: "100px",
                    background: "#F87454",
                    color: "white",
                    border: "none",
                    borderRadius: "100px 100px 100px 100px",
                    cursor: "pointer",
                  }}
                >
                  <span>
                    <Text
                      style={{ paddingTop: "6px", paddingBottom: "6px" }}
                      sizes={[16, 16, 15, 15, 14]}
                      fontWeight={500}
                      fontFamily={"Poppins"}
                    >
                      Continue
                    </Text>
                  </span>
                </div>
              </div>
            </div>
          )}
          {newKeypairModalState === "confirmation" && (
            <div style={{ width: "600px" }}>
              <Text
                content={`Create new keypair?`}
                sizes={[16, 16, 15, 15, 22]}
                color={"#E0694C"}
                fontFamily={"Poppins"}
              />
              <Text
                style={{ marginTop: "42px", marginBottom: "16px" }}
                content={`Please confirm your organization's new private key:`}
                sizes={[16, 16, 15, 15, 16]}
                fontFamily={"Muli"}
              />
              <Input
                value={newPrivateKey}
                onChange={(e) => {
                  setNewPrivateKey(e.target.value);
                }}
              ></Input>
              <Text
                style={{ marginTop: "28px", color: "#4C54D2" }}
                content={
                  "Once confirmed, your organization's keypair will be replaced with the new keypair."
                }
                sizes={[16, 16, 15, 15, 15]}
                fontFamily={"Poppins"}
              />
              <div
                style={{ display: "flex", width: "100%", marginTop: "42px" }}
              >
                <div
                  onClick={() => {
                    closeNewKeypairModal();
                  }}
                  style={{
                    marginLeft: "auto",
                    marginRight: "28px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0px 20px",
                    width: "100px",
                    border: "1px solid #e2e2e2",
                    borderRadius: "100px 100px 100px 100px",
                    cursor: "pointer",
                  }}
                >
                  <span>
                    <Text
                      style={{ paddingTop: "6px", paddingBottom: "6px" }}
                      sizes={[16, 16, 15, 15, 14]}
                      fontWeight={500}
                      fontFamily={"Poppins"}
                    >
                      Cancel
                    </Text>
                  </span>
                </div>
                {privateKey === newPrivateKey && !loading && (
                  <div
                    onClick={() => {
                      saveKeypair();
                    }}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "0px 20px",
                      width: "100px",
                      background: "#F87454",
                      color: "white",
                      border: "none",
                      borderRadius: "100px 100px 100px 100px",
                      cursor: "pointer",
                    }}
                  >
                    <span>
                      <Text
                        style={{ paddingTop: "6px", paddingBottom: "6px" }}
                        sizes={[16, 16, 15, 15, 14]}
                        fontWeight={500}
                        fontFamily={"Poppins"}
                      >
                        Save
                      </Text>
                    </span>
                  </div>
                )}
                {privateKey === newPrivateKey && loading && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "0px 20px",
                      width: "100px",
                      background: "#F87454",
                      color: "white",
                      border: "none",
                      borderRadius: "100px 100px 100px 100px",
                      cursor: "pointer",
                      opacity: 0.5,
                    }}
                  >
                    <span>
                      <Text
                        style={{ paddingTop: "6px", paddingBottom: "6px" }}
                        sizes={[16, 16, 15, 15, 14]}
                        fontWeight={500}
                        fontFamily={"Poppins"}
                      >
                        Saving...
                      </Text>
                    </span>
                  </div>
                )}
                {privateKey !== newPrivateKey && !loading && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "0px 20px",
                      width: "100px",
                      background: "#F87454",
                      color: "white",
                      border: "none",
                      borderRadius: "100px 100px 100px 100px",
                      cursor: "pointer",
                      opacity: 0.5,
                    }}
                  >
                    <span>
                      <Text
                        style={{ paddingTop: "6px", paddingBottom: "6px" }}
                        sizes={[16, 16, 15, 15, 14]}
                        fontWeight={500}
                        fontFamily={"Poppins"}
                      >
                        Save
                      </Text>
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Settings;
