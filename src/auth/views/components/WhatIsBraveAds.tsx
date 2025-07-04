import { Box, Stack, Typography } from "@mui/material";
import { Trans } from "@lingui/macro";

export function WhatIsBraveAds() {
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Stack maxWidth={1000} spacing={3}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={600}
          color="white"
        >
          <Trans>What is Brave Ads?</Trans>
        </Typography>

        <Typography variant="subtitle1" textAlign="center" color="white">
          <Trans>
            It is a modern <em>advertiser-first</em> ad platform made to help
            brands reach new users. Brave Ads are discrete, unobtrusive
            first-party ads built directly into the browser and search engine.
            Brave’s innovative on-device targeting respects a user’s desire for
            privacy while still delivering personalized ads based on their
            interests, which drives high ROI for advertisers.
          </Trans>
        </Typography>
      </Stack>
    </Box>
  );
}
