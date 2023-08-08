import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import {
  Button,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

type RouteOption = {
  label: string;
  href: string;
  icon: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<any>) => void;
};

const drawerWidth = 120;
export default function MiniSideBar({ children }: PropsWithChildren) {
  const dashboardRoutes: RouteOption[] = [
    {
      label: "Campaigns",
      href: "/user/main/campaign",
      icon: (
        <CampaignOutlinedIcon
          fontSize="large"
          sx={{ color: "text.secondary" }}
        />
      ),
    },
    // Possible future enhancements, not visible to user but help keep spacing
    {
      label: "Creatives",
      href: "/user/main/creatives",
      icon: (
        <LightbulbOutlinedIcon
          fontSize="large"
          sx={{ color: "text.secondary" }}
        />
      ),
      disabled: true,
    },
    {
      label: "Assets",
      href: "/user/main/assets",
      icon: (
        <InsertPhotoOutlinedIcon
          fontSize="large"
          sx={{ color: "text.secondary" }}
        />
      ),
      disabled: true,
    },
    {
      label: "Audiences",
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
      label: "Account",
      href: "/user/main/settings",
      icon: (
        <AccountBalanceOutlinedIcon
          fontSize="large"
          sx={{ color: "text.secondary" }}
        />
      ),
    },
    {
      label: "Profile",
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
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        open
        sx={{
          width: drawerWidth,
        }}
      >
        <Toolbar />
        <List>
          {dashboardRoutes.map((dr) => (
            <ItemBox
              href={dr.href}
              icon={dr.icon}
              label={dr.label}
              disabled={dr.disabled}
            />
          ))}
          <Divider sx={{ mt: 3, mb: 3 }} />
          {settingsRoutes.map((sr) => (
            <ItemBox href={sr.href} icon={sr.icon} label={sr.label} />
          ))}
          <SupportMenu />
        </List>
      </Drawer>
      {children}
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
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
      selected={match.url.includes(props.href)}
      onClick={props.onClick}
    >
      <ListItemIcon sx={{ minWidth: "unset" }}>{props.icon}</ListItemIcon>
      <ListItemText disableTypography>
        <Typography textAlign="center">{props.label}</Typography>
      </ListItemText>
    </ListItemButton>
  );
};

export function SupportMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <ItemBox
        label="Support"
        href="#"
        icon={
          <HeadsetMicOutlinedIcon
            fontSize="large"
            sx={{ color: "text.secondary" }}
          />
        }
        onClick={handleClick}
      />
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            window.open("https://brave.com/brave-ads", "_blank");
            setAnchorEl(null);
          }}
        >
          Advertiser Resources
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open("mailto:selfserve@brave.com", "_self");
            setAnchorEl(null);
          }}
        >
          Email support:{" "}
          <Link sx={{ ml: 1 }} underline="none">
            selfserve@brave.com
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
