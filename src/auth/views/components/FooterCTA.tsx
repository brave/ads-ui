import { Box, Button, Stack, Typography } from "@mui/material";
import { Trans } from "@lingui/macro";
import { Link as RouterLink } from "react-router-dom";

export function FooterCTA() {
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Stack maxWidth={1000} spacing={3}>
        <Typography variant="h4" textAlign="center" fontWeight={500}>
          <Trans>
            Ready to reach your first million users? Start your first campaign
            today.
          </Trans>
        </Typography>

        <Typography variant="subtitle1" textAlign="center">
          <Trans>
            Brave’s 70+ million cord cutters, and tech savvy early adopters want
            privacy and performance over tracking and lag. Hundreds of thousands
            more make the switch every day. Want them to see your brand? Start
            your first campaign in minutes, and with as little as $500.
          </Trans>
        </Typography>

        <Button
          variant="contained"
          component={RouterLink}
          sx={{
            width: "180px",
            maxHeight: { xs: "40px", md: "60px" },
            mb: 1,
            fontSize: "18px",
            alignSelf: "center",
          }}
          to="/register/browser"
        >
          <Trans>Get started</Trans>
        </Button>
      </Stack>
    </Box>
  );
}
