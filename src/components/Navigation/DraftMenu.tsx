import * as React from "react";
import { useContext, useState } from "react";

import { useHistory } from "react-router-dom";
import { Badge, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import { DraftContext } from "state/context";

export function DraftMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const { drafts } = useContext(DraftContext);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Tooltip title="Local Campaign Drafts">
        <span>
          <IconButton disabled={drafts.length === 0} onClick={handleClick}>
            <Badge color="primary" badgeContent={drafts.length}>
              <DraftsIcon fontSize="medium" />
            </Badge>
          </IconButton>
        </span>
      </Tooltip>
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
            onClick={() => {
              history.push(
                `/user/main/adsmanager/advanced/new/${d.draftId}/settings`,
              );
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
