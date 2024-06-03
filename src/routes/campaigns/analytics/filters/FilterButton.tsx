import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckIcon from "@mui/icons-material/Check";
import { Dispatch, ReactNode, useState } from "react";

interface MenuItemProps {
  id: string;
  label: string;
  divider?: boolean;
}

interface Props<M extends MenuItemProps> {
  label: ReactNode;
  menuItems: M[];
  prefix?: ReactNode;

  // for single selection, just the currently selected value here
  value?: M | undefined;

  // for multi-selection, leave `value` undefined and implement this callback
  // "selected" => draw a checkmark next to the item
  // "unselected" => don't draw a checkmark, but leave space for one
  // "no-selection-state" => don't draw a checkmark and don't leave space for one
  itemSelectionState?: (
    item: M,
  ) => "selected" | "unselected" | "no-selection-state";

  onChange: Dispatch<M>;
}

export function FilterButton<M extends MenuItemProps>({
  label,
  onChange,
  menuItems,
  prefix,
  value,
  itemSelectionState = () => "no-selection-state",
}: Props<M>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelection = (m: M) => () => {
    onChange(m);
    setAnchorEl(null);
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="baseline">
      <Typography variant="button">{prefix}</Typography>
      <Button
        variant="contained"
        endIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        onClick={handleButtonClick}
        size="medium"
        sx={{
          borderRadius: 1,
        }}
      >
        {label}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuItems.map((b) => {
          const selectionState = itemSelectionState(b);
          return (
            <MenuItem
              key={b.id}
              onClick={handleSelection(b)}
              selected={b.id === value?.id}
              divider={b.divider}
            >
              {selectionState !== "no-selection-state" && (
                <CheckIcon
                  fontSize="small"
                  sx={{
                    marginRight: 1,
                    visibility:
                      selectionState === "selected" ? "visible" : "hidden",
                  }}
                />
              )}
              {b.label}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}
