import { useRecentlyCreatedAdvertiserCreatives } from "user/hooks/useAdvertiserCreatives";
import { CardContainer } from "components/Card/CardContainer";
import { Box, Button, Stack } from "@mui/material";
import { useState } from "react";
import { BoxContainer } from "components/Box/BoxContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { NotificationAd } from "user/ads/NotificationAd";
import { useField } from "formik";
import { NotificationPreview } from "components/Creatives/NotificationPreview";

export function NewAd() {
  const [, meta, helper] = useField<boolean>("isCreating");
  const [showForm, setShowForm] = useState(false);
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
            <BoxContainer header={c.name} key={idx}>
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
      </CardContainer>
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
