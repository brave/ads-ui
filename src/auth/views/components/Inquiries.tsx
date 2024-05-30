import { Button, Stack, Typography } from "@mui/material";
import { Trans } from "@lingui/macro";
import { Link as RouterLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import bat from "@/assets/images/bat.svg";

const button = {
  border: "1px solid rgba(255, 255, 255, 0.8)",
  padding: "24px",
  borderRadius: "8px",
  fontSize: "18px",
};

export function Inquiries() {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignSelf="center"
      justifyContent="space-evenly"
      width="100%"
      pt={2}
      spacing={2}
      mt={2}
    >
      <Button
        component={RouterLink}
        to="/search"
        sx={button}
        startIcon={<SearchIcon sx={{ color: "white" }} />}
        endIcon={<KeyboardArrowRightIcon sx={{ color: "white" }} />}
      >
        <Typography color="white">
          <Trans>Brave Search Ads</Trans>
        </Typography>
      </Button>
      <Button
        component={RouterLink}
        to="/contact"
        sx={button}
        startIcon={<AlternateEmailOutlinedIcon sx={{ color: "white" }} />}
        endIcon={<KeyboardArrowRightIcon sx={{ color: "white" }} />}
      >
        <Typography color="white">
          <Trans>General Ad Inquiries</Trans>
        </Typography>
      </Button>
      <Button
        component={RouterLink}
        to="/bat"
        sx={button}
        startIcon={<img src={bat} alt="BAT" height={20} width={20} />}
        endIcon={<KeyboardArrowRightIcon sx={{ color: "white" }} />}
      >
        <Typography color="white">
          <Trans>Basic Attention Token</Trans>
        </Typography>
      </Button>
      <Button
        component={Button}
        onClick={() =>
          window.open("https://ads-help.brave.com/", "_blank", "noopener")
        }
        sx={button}
        startIcon={<HelpOutlineOutlinedIcon sx={{ color: "white" }} />}
        endIcon={<KeyboardArrowRightIcon sx={{ color: "white" }} />}
      >
        <Typography color="white">
          <Trans>Help Center</Trans>
        </Typography>
      </Button>
    </Stack>
  );
}
