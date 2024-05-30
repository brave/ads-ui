import { Box, Stack, Typography } from "@mui/material";
import { Trans } from "@lingui/macro";

export function WhatIsBrave() {
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Stack maxWidth={1000} spacing={3}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={600}
          color="white"
        >
          <Trans>What’s Brave?</Trans>
        </Typography>

        <Typography variant="subtitle1" textAlign="center" color="white">
          <Trans>
            Brave is an independent company dedicated to building a user-first
            Web. Our private, feature-rich browser and search engine are used by
            70+ million people worldwide, with hundreds of thousands more
            downloading every day.
          </Trans>
        </Typography>
      </Stack>
    </Box>
  );
}
