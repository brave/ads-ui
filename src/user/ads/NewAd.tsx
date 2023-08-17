import { useRecentlyCreatedAdvertiserCreatives } from "user/hooks/useAdvertiserCreatives";
import { CardContainer } from "components/Card/CardContainer";
import { Box, Button, IconButton, Link, Stack } from "@mui/material";
import { useState } from "react";
import { BoxContainer } from "components/Box/BoxContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { NotificationAd } from "user/ads/NotificationAd";
import { useField, useFormikContext } from "formik";
import { NotificationPreview } from "components/Creatives/NotificationPreview";
import { AdsNewAd } from "user/ads/AdsNewAd";
import { CampaignForm, Creative } from "user/views/adsManager/types";
import _ from "lodash";

export function NewAd() {
  const [, meta, helper] = useField<boolean>("isCreating");
  const [showForm, setShowForm] = useState(false);
  const [useExisting, setUseExisting] = useState(false);
  const creatives = useRecentlyCreatedAdvertiserCreatives();

  return (
    <>
      <CardContainer header="Ads">
        <Stack
          direction="row"
          justifyContent="left"
          alignItems="center"
          flexWrap="wrap"
        >
          {(creatives ?? []).map((c, idx) => (
            <BoxContainer header={<RemoveHeader creative={c} />} key={idx}>
              <NotificationPreview title={c.title} body={c.body} />
            </BoxContainer>
          ))}
          <BoxContainer header={showForm ? "Discard Ad" : "Create New Ad"}>
            <Box
              component={Button}
              height="80px"
              width="350px"
              borderRadius="13px"
              border="1px solid #e2e2e2"
              onClick={() => {
                helper.setValue(!meta.value);
                setShowForm(!showForm);
                setUseExisting(false);
              }}
            >
              {showForm ? (
                <RemoveCircleOutlineIcon fontSize="large" />
              ) : (
                <AddCircleOutlineIcon fontSize="large" />
              )}
            </Box>
          </BoxContainer>
        </Stack>
        {!useExisting && (
          <Link
            onClick={() => {
              setUseExisting(true);
              setShowForm(false);
            }}
            underline="none"
            sx={{ cursor: "pointer" }}
          >
            Choose a previously made Creative
          </Link>
        )}
      </CardContainer>
      {useExisting && (
        <AdsNewAd onAddCreative={() => setUseExisting(!useExisting)} />
      )}
      {showForm && (
        <NotificationAd
          onCreate={() => {
            helper.setValue(false);
            setShowForm(false);
          }}
        />
      )}
    </>
  );
}

const RemoveHeader = (props: { creative: Creative }) => {
  const { values, setFieldValue } = useFormikContext<CampaignForm>();

  const onRemoveCreative = async (c: Creative, v: string[] | undefined) => {
    const removed = _.filter(v ?? [], (n) => n !== c.id);
    void setFieldValue("creatives", removed);
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      {props.creative.name}
      <IconButton
        onClick={() => onRemoveCreative(props.creative, values.creatives)}
        sx={{ p: 0 }}
      >
        <RemoveCircleOutlineIcon color="error" fontSize="small" />
      </IconButton>
    </Box>
  );
};
