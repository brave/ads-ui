import { Box, Stack, Typography } from "@mui/material";

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
          What is Brave Ads?
        </Typography>

        <Typography variant="subtitle1" textAlign="center" color="white">
          It is a modern <em>advertiser-first</em> ad platform made to help
          brands reach new users. Brave Ads are discrete, unobtrusive
          first-party ads built directly into the browser and search engine.
          Brave&apos;s innovative on-device targeting respects a user&apos;s
          desire for privacy while still delivering personalized ads based on
          their interests, which drives high ROI for advertisers.
        </Typography>
      </Stack>
    </Box>
  );
}
