import * as React from "react";

import { useHistory } from "react-router-dom";
import { Badge, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import DraftsIcon from "@mui/icons-material/Drafts";

interface Props {
  signOut: () => void;
}

export function UserMenu({ signOut }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

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
    </>
  );
}
