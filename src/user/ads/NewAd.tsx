import { useRecentlyCreatedAdvertiserCreatives } from "user/hooks/useAdvertiserCreatives";
import { CardContainer } from "components/Card/CardContainer";
import { Box, Button, Stack } from "@mui/material";
import React, { useState } from "react";
import { BoxContainer } from "components/Box/BoxContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { NotificationPreview } from "user/ads/NotificationPreview";
import { NotificationAd } from "user/ads/NotificationAd";

export function NewAd() {
  const [showForm, setShowForm] = useState(false);
  const creatives = useRecentlyCreatedAdvertiserCreatives();

  return (
    <React.Fragment>
      <CardContainer header="Ads">
        <Stack
          direction="row"
          justifyContent="left"
          alignItems="center"
          flexWrap="wrap"
        >
          {(creatives ?? []).map((c) => (
            <BoxContainer header={c.name}>
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
              onClick={() => setShowForm(!showForm)}
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
      {showForm && <NotificationAd onCreate={() => setShowForm(false)} />}
    </React.Fragment>
  );
}
