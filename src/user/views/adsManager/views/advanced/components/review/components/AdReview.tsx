import { Stack } from "@mui/material";
import { useRecentlyCreatedAdvertiserCreatives } from "user/hooks/useAdvertiserCreatives";
import { BoxContainer } from "components/Box/BoxContainer";
import { NotificationPreview } from "user/ads/NotificationPreview";
import React from "react";

export function AdReview() {
  const creatives = useRecentlyCreatedAdvertiserCreatives();

  return (
    <>
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
      </Stack>
    </>
  );
}
