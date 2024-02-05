import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import {
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { PropsWithChildren, ReactNode, MouseEvent, useState } from "react";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { AlwaysOnFormButton } from "components/Button/AlwaysOnFormButton";
import { useIsMobile } from "hooks/useIsMobile";
import { useTrackMatomoEvent } from "hooks/useTrackWithMatomo";
import { msg, Trans } from "@lingui/macro";
import { Trans as TransWithId } from "@lingui/react";
import { MessageDescriptor } from "@lingui/core";

type RouteOption = {
  label: MessageDescriptor;
  href: string;
  icon: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<any>) => void;
};

const drawerWidth = 85;
export default function MiniSideBar({ children }: PropsWithChildren) {
  const { advertiser } = useAdvertiser();
  const dashboardRoutes: RouteOption[] = [
    {
      label: msg`Campaigns`,
      href: "/user/main/campaign",
      icon: (
        <CampaignOutlinedIcon
          fontSize="large"
          sx={{ color: "text.secondary" }}
        />
      ),
    },
    {
      label: msg`Ads`,
      href: "/user/main/ads",
      icon: (
        <LightbulbOutlinedIcon
          fontSize="large"
          sx={{ color: "text.secondary" }}
        />
      ),
      disabled: !advertiser.selfServiceManageCampaign,
    },
    {
      label: msg`Audiences`,
      href: "/user/main/audiences",
      icon: (
        <PeopleOutlineOutlinedIcon
          fontSize="large"
          sx={{ color: "text.secondary" }}
        />
      ),
      disabled: true,
    },
  ];

  const settingsRoutes: RouteOption[] = [
    {
      label: msg`Account`,
      href: "/user/main/settings",
      icon: (
        <AccountBalanceOutlinedIcon
          fontSize="large"
          sx={{ color: "text.secondary" }}
        />
      ),
    },
    {
      label: msg`Profile`,
      href: "/user/main/profile",
      icon: (
        <AccountBoxOutlinedIcon
          fontSize="large"
          sx={{ color: "text.secondary" }}
        />
      ),
    },
  ];

  return (
    <Box display="flex">
      <Drawer
        variant="permanent"
        open
        sx={{
          width: drawerWidth,
        }}
      >
        <Toolbar />
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          flexGrow={1}
        >
          <List>
            {dashboardRoutes.map((dr) => (
              <ItemBox
                key={dr.href}
                href={dr.href}
                icon={dr.icon}
                label={dr.label}
                disabled={dr.disabled}
              />
            ))}
          </List>
          <List>
            <Divider sx={{ mt: 3, mb: 3 }} />
            {settingsRoutes.map((sr) => (
              <ItemBox
                href={sr.href}
                icon={sr.icon}
                label={sr.label}
                key={sr.href}
              />
            ))}
            <SupportMenu />
          </List>
        </Box>
      </Drawer>
      {children}
      <AlwaysOnFormButton />
    </Box>
  );
}

const ItemBox = (props: RouteOption) => {
  const match = useRouteMatch();
  return (
    <ListItemButton
      component={RouterLink}
      to={props.href}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "0px",
        gap: "3px",
        visibility: props.disabled ? "hidden" : "visible",
        paddingLeft: "3px",
        paddingRight: "3px",
      }}
      selected={match.url.includes(props.href)}
      onClick={props.onClick}
    >
      <ListItemIcon sx={{ minWidth: "unset" }}>{props.icon}</ListItemIcon>
      <ListItemText disableTypography>
        <Typography textAlign="center" variant="caption" fontWeight={500}>
          <TransWithId id={props.label.id} />
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};

interface SupportProps {
  usePlainLink?: boolean;
}

export function SupportMenu({ usePlainLink }: SupportProps) {
  const { trackMatomoEvent } = useTrackMatomoEvent();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const isMobile = useIsMobile();

  const handleClick = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    trackMatomoEvent("support-menu", "click");
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      {!usePlainLink && (
        <ItemBox
          label={msg`Support`}
          href="#"
          icon={
            <HeadsetMicOutlinedIcon
              fontSize="large"
              sx={{ color: "text.secondary" }}
            />
          }
          onClick={handleClick}
        />
      )}
      {usePlainLink && (
        <Link
          variant={isMobile ? "body2" : "subtitle1"}
          underline="none"
          color="text.primary"
          sx={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          <Trans>Support</Trans>
        </Link>
      )}
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            window.open("https://ads-help.brave.com/", "_blank", "noopener");
            setAnchorEl(null);
          }}
        >
          <Trans>Help Center</Trans>
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open("https://brave.com/brave-ads", "_blank", "noopener");
            setAnchorEl(null);
          }}
        >
          <Trans>About Brave Ads</Trans>
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open("mailto:selfserve@brave.com", "_self", "noopener");
            setAnchorEl(null);
          }}
        >
          <Trans>Contact</Trans>:{" "}
          <Link sx={{ ml: 1 }} underline="none">
            selfserve@brave.com
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
