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
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

type RouteOption = {
  label: string;
  href: string;
  icon: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<any>) => void;
};

const drawerWidth = 110;
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
              key={dr.href}
              href={dr.href}
              icon={dr.icon}
              label={dr.label}
              disabled={dr.disabled}
            />
          ))}
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
        paddingLeft: "3px",
        paddingRight: "3px",
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

interface SupportProps {
  usePlainLink?: boolean;
}

export function SupportMenu({ usePlainLink }: SupportProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (
    event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      {!usePlainLink && (
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
      )}
      {usePlainLink && (
        <Link
          variant="subtitle1"
          underline="none"
          color="text.primary"
          sx={{ cursor: "pointer" }}
          onClick={handleClick}
        >
          Support
        </Link>
      )}
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            window.open(
              "https://support.brave.com/hc/en-us/articles/14354133537421-How-do-I-use-Brave-Ads-Self-Serve-Beta-",
              "_blank",
              "noopener",
            );
            setAnchorEl(null);
          }}
        >
          Brave Ads Tutorial
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open("https://brave.com/brave-ads", "_blank", "noopener");
            setAnchorEl(null);
          }}
        >
          Advertiser Resources
        </MenuItem>
        <MenuItem
          onClick={() => {
            window.open("mailto:selfserve@brave.com", "_self", "noopener");
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
