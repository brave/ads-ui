import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function FooterCTA() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={5}
      paddingX={{ xs: 1, lg: 0 }}
    >
      <Stack maxWidth={1000} spacing={3}>
        <Typography variant="h4" textAlign="center" fontWeight={500}>
          Ready to reach your first million users? Start your first campaign
          today.
        </Typography>

        <Typography variant="subtitle1" textAlign="center">
          Brave&apos;s 70+ million cord cutters, and tech savvy early adopters
          want privacy and performance over tracking and lag. Hundreds of
          thousands more make the switch every day. Want them to see your brand?
          Start your first campaign in minutes, and with as little as $500.
        </Typography>

        <Button
          // variant="contained"
          component={RouterLink}
          sx={{
            width: "180px",
            maxHeight: { xs: "40px", md: "80px" },
            fontSize: "18px",
            alignSelf: "center",
            background:
              "linear-gradient(101.5deg, #770EAA 21.56%, #B72070 74.97%, #E6461E 104.58%)",
            boxShadow: "0 3px 10px -1px rgba(0, 0, 0, 6%)",
            backgroundClip: "padding-box",
            color: "white",
            p: 1.5,
          }}
          to="/register/browser"
        >
          Get started
        </Button>
      </Stack>
    </Box>
  );
}
