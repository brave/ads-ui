import {
  Button,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { MessageDescriptor } from "@lingui/core";
import { useState } from "react";
import logo from "@/assets/images/brave-icon-release-color.svg";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { useIsMobile } from "@/hooks/useIsMobile";
import { AuthContainer } from "@/auth/views/components/AuthContainer";

interface ChoiceOptions {
  title: MessageDescriptor;
  value: string;
}

export function AccountChoice() {
  const isMobile = useIsMobile();
  useTrackMatomoPageView({
    documentTitle: `Ads Account Choice`,
  });

  const [accountType, setAccountType] = useState<string>();
  const buttons: ChoiceOptions[] = [
    {
      title: msg`Browser ads`,
      value: "browser",
    },
    {
      title: msg`Search ads`,
      value: "search",
    },
  ];

  return (
    <AuthContainer>
      {!isMobile && <div style={{ width: 500 }} />}
      <img src={logo} height={65} width={100} style={{ marginBottom: 15 }} />
      <Typography variant="h5">
        <Trans>Choose campaign type</Trans>
      </Typography>
      <Link
        underline="none"
        variant="caption"
        href="https://ads-help.brave.com/category/ad-placements"
      >
        <Trans>Learn more about various campaign types</Trans>
      </Link>
      <List>
        {buttons.map((b) => (
          <AccountItemButton
            key={`account_item_button_${b.value}`}
            {...b}
            current={accountType}
            onClick={setAccountType}
          />
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        size="large"
        disabled={!accountType}
        sx={{ borderRadius: "12px", mt: 5, padding: "15px 50px 15px 50px" }}
        component={RouterLink}
        to={accountType === "search" ? "/register/search" : "/register/browser"}
      >
        <Trans>Next</Trans>
      </Button>
      <Typography variant="caption" mt={2}>
        <Trans>
          or{" "}
          <Link component={RouterLink} to="/contact" underline="none">
            contact us
          </Link>{" "}
          for New Tab Takeover campaigns
        </Trans>
      </Typography>
    </AuthContainer>
  );
}

interface ButtonOptions {
  current?: string;
  onClick: (s: string) => void;
}

function AccountItemButton({
  title,
  value,
  current,
  onClick,
}: ChoiceOptions & ButtonOptions) {
  const { _ } = useLingui();
  const theme = useTheme();

  return (
    <ListItemButton
      sx={{
        borderRadius: "12px",
        border:
          value === current
            ? `2px solid ${theme.palette.primary.main}`
            : "2px solid #e0e0e0",
        display: "flex",
        padding: "35px 120px 35px 120px",
        mt: 2,
      }}
      onClick={() => onClick(value)}
      selected={current === value}
    >
      <ListItemText
        primary={_(title)}
        primaryTypographyProps={{
          fontSize: "20px",
          color:
            value === current ? theme.palette.primary.main : "text.primary",
        }}
      />
    </ListItemButton>
  );
}
