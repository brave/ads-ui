import { Button, Stack, Typography } from "@mui/material";
import { Trans } from "@lingui/macro";
import { Link as RouterLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";

export function Inquiries() {
  return (
    <Stack
      direction="row"
      alignSelf="center"
      justifyContent="space-evenly"
      width="100%"
      pt={2}
    >
      <Button
        component={RouterLink}
        to="/search"
        sx={{
          border: "1px solid rgba(255, 255, 255, 0.4)",
          padding: "24px",
          borderRadius: "8px",
          fontSize: "18px",
        }}
        startIcon={<SearchIcon sx={{ color: "white" }} />}
        endIcon={<KeyboardArrowRightIcon sx={{ color: "white" }} />}
      >
        <Typography color="white">
          <Trans>Brave Search Ads</Trans>
        </Typography>
      </Button>
      <Button
        component={Button}
        sx={{
          border: "1px solid rgba(255, 255, 255, 0.4)",
          padding: "24px",
          borderRadius: "8px",
          fontSize: "18px",
        }}
        startIcon={<HelpOutlineOutlinedIcon sx={{ color: "white" }} />}
        endIcon={<KeyboardArrowRightIcon sx={{ color: "white" }} />}
      >
        <Typography color="white">
          <Trans>Help Center</Trans>
        </Typography>
      </Button>
      <Button
        component={RouterLink}
        to="/contact"
        sx={{
          border: "1px solid rgba(255, 255, 255, 0.4)",
          padding: "24px",
          borderRadius: "8px",
          fontSize: "18px",
        }}
        startIcon={<AlternateEmailOutlinedIcon sx={{ color: "white" }} />}
        endIcon={<KeyboardArrowRightIcon sx={{ color: "white" }} />}
      >
        <Typography color="white">
          <Trans>General Inquiries</Trans>
        </Typography>
      </Button>
    </Stack>
  );
}
