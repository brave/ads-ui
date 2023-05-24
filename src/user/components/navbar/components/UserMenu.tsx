import * as React from "react";
import { useState } from "react";

import { useHistory } from "react-router-dom";
import { Button, Menu, MenuItem, Snackbar } from "@mui/material";
import { useSignOut } from "auth/hooks/mutations/useSignOut";

export function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [snackbar, setSnackbar] = useState({ open: false, msg: "" });
  const history = useHistory();

  const { signOut } = useSignOut({
    onSuccess() {
      history.push("/", undefined);
      setAnchorEl(null);
    },
    onError(msg) {
      setSnackbar({ open: true, msg });
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button onClick={handleClick} sx={{ p: 1, mr: 2 }} size="large">
        Account
      </Button>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem
          onClick={() => {
            history.push("/user/main/settings");
            setAnchorEl(null);
          }}
          sx={{ pl: 20, pr: 20, pt: 3, pb: 3 }}
        >
          Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            signOut();
            setAnchorEl(null);
          }}
          sx={{ pl: 20, pr: 20, pt: 3, pb: 3 }}
        >
          Sign Out
        </MenuItem>
      </Menu>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbar.open}
        onClose={() => setSnackbar({ open: false, msg: "" })}
        message={snackbar.msg}
      />
    </>
  );
}
