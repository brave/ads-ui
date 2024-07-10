import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Settings from "@mui/icons-material/Settings";
import { useState } from "react";
import { useUser } from "@/auth/hooks/queries/useUser";
import { Button, Tooltip, Typography } from "@mui/material";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { Link as RouterLink } from "react-router-dom";
import { setActiveAdvertiser } from "@/auth/util/index";
import Logout from "@mui/icons-material/Logout";
import { useSignOut } from "@/auth/hooks/mutations/useSignOut";
import { useAuthContext } from "@/auth/context/auth.hook";
import { Trans } from "@lingui/macro";

const colors = ["red", "green", "orange", "blue"];
const colorByIndex = (index: number) => colors[index % colors.length];

export function AccountMenu() {
  const { signOut } = useSignOut();
  const user = useUser();
  const { advertiser, advertisers } = useAdvertiser();
  const { setSessionUser } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const nonCurrentAdvertisers = advertisers.filter(
    (a) => a.id !== advertiser.id,
  );

  // the navbar can be used for non-logged in users, so just don't display
  // a profile if the user is not logged in
  if (!user.userId) {
    return null;
  }

  return (
    <>
      <Tooltip title={<Trans>Account</Trans>} placement="bottom-start">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
          <Avatar sx={{ width: 43, height: 43, bgcolor: "#fe5907" }}>
            {advertiser.name.substring(0, 1)}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              minWidth: 275,
              p: 2,
              borderRadius: "16px",
              overflow: "visible",
              // eslint-disable-next-line lingui/no-unlocalized-strings
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1,
              "& .MuiAvatar-root": {
                width: 24,
                height: 24,
                ml: -0.5,
                fontSize: 14,
              },
            },
          },
        }}
      >
        <Box display="flex" flexDirection="column" mb={1.5}>
          <Typography variant="subtitle2" textAlign="center">
            {user.email}
          </Typography>
          <Typography
            textAlign="center"
            fontSize="1.375rem"
            fontWeight={400}
            mt={2}
          >
            <Trans>Hi</Trans>, {user.fullName?.split(" ")[0]}!
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 1, maxWidth: 150, alignSelf: "center" }}
            size={"small"}
            component={RouterLink}
            to="/user/main/profile"
          >
            <Trans>View profile</Trans>
          </Button>
          <Typography variant="body2" mt={2}>
            <Trans>Account</Trans>:
          </Typography>
          <Typography variant="body1" fontWeight={410}>
            {advertiser?.name}
          </Typography>
        </Box>
        <Divider />
        {nonCurrentAdvertisers.length > 0 && (
          <Box mt={1} display="flex" justifyContent="space-between">
            <Trans>Other accounts</Trans>
            <IconButton
              size="small"
              sx={{ ml: 1 }}
              component={RouterLink}
              to="/user/main/settings"
            >
              <Settings fontSize="small" />
            </IconButton>
          </Box>
        )}
        {nonCurrentAdvertisers.map((a, idx) => (
          <MenuItem
            onClick={() => {
              setActiveAdvertiser(a.id);
              setSessionUser({ ...user, id: user.userId, advertisers } as any);
            }}
          >
            <ListItemIcon>
              <Avatar sx={{ bgcolor: colorByIndex(idx) }}>
                {a.name.substring(0, 1)}
              </Avatar>
            </ListItemIcon>
            {a.name}
          </MenuItem>
        ))}
        <MenuItem onClick={() => signOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Trans>Logout</Trans>
        </MenuItem>
      </Menu>
    </>
  );
}
