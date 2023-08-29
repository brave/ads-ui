import { useContext, useState, MouseEvent } from "react";

import { Link as RouterLink } from "react-router-dom";
import { Badge, Button, Menu, MenuItem } from "@mui/material";
import { DraftContext } from "state/context";

export function DraftMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { drafts } = useContext(DraftContext);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        disabled={drafts.length === 0}
        onClick={handleClick}
        sx={{ pr: 3 }}
        endIcon={
          <Badge color="primary" badgeContent={drafts.length} sx={{ ml: 1 }} />
        }
      >
        Campaign Drafts
      </Button>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem
          disabled
          divider
          sx={{
            "&.MuiButtonBase-root": {
              "&.MuiMenuItem-root": {
                "&.Mui-disabled": {
                  opacity: 1,
                },
              },
            },
            minWidth: "250px",
          }}
        >
          Drafts
        </MenuItem>
        {drafts.map((d, idx) => (
          <MenuItem
            key={`draft-${d.draftId}-${idx}`}
            component={RouterLink}
            to={`/user/main/adsmanager/advanced/new/${d.draftId}/settings`}
            onClick={() => {
              setAnchorEl(null);
            }}
            sx={{ pt: 1, pb: 1, minWidth: "250px" }}
          >
            {d.name || `Draft ${idx}`}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
