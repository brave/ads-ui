import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { Button, Drawer, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

type RouteOption = {
  label: string;
  href: string;
  icon: React.ReactNode;
  disabled?: boolean;
};

const drawerWidth = 120;
export default function MiniSideBar({ children }: PropsWithChildren) {
  const dashboardRoutes: RouteOption[] = [
    {
      label: "Campaigns",
      href: "/user/main/campaign",
      icon: <CampaignOutlinedIcon fontSize="large" />,
    },
    {
      label: "Assets",
      href: "/user/main/assets",
      icon: <InsertPhotoOutlinedIcon fontSize="large" />,
      disabled: true,
    },
    {
      label: "Audiences",
      href: "/user/main/audiences",
      icon: <CampaignOutlinedIcon fontSize="large" />,
      disabled: true,
    },
  ];

  const settingsRoutes: RouteOption[] = [
    {
      label: "Account",
      href: "/user/main/settings",
      icon: <AccountBalanceOutlinedIcon fontSize="large" />,
    },
    {
      label: "Profile",
      href: "/user/main/profile",
      icon: <AccountBoxOutlinedIcon fontSize="large" />,
    },
    {
      label: "Support",
      href: "mailto:selfserve@brave.com",
      icon: <HeadsetMicOutlinedIcon fontSize="large" />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        open
        sx={{
          width: drawerWidth,
        }}
      >
        <Toolbar />
        <Box
          sx={{
            padding: "6px 0px 6px 0px",
          }}
        >
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
        </Box>
      </Drawer>
      {children}
    </Box>
  );
}

const ItemBox = (props: RouteOption) => {
  return (
    <Box
      display="flex"
      component={Button}
      href={props.href}
      disabled={props.disabled}
      sx={{
        textTransform: "none",
        padding: "15px 6px 15px 6px",
        borderRadius: "0px",
        gap: "8px",
      }}
    >
      <Box
        sx={{ visibility: props.disabled ? "hidden" : "visible" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {props.icon}
        <Typography>{props.label}</Typography>
      </Box>
    </Box>
  );
};
