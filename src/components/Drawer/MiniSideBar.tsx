import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { Drawer, List } from "@mui/material";
import { PropsWithChildren } from "react";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { AlwaysOnFormButton } from "components/Button/AlwaysOnFormButton";
import { msg } from "@lingui/macro";
import { SupportMenu } from "components/Drawer/SupportMenu";
import { ItemBox, RouteOption } from "components/Drawer/components/ItemBox";

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
