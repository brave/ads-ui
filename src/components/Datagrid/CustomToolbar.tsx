/* eslint-disable lingui/no-unlocalized-strings */
import React from "react";
import {
  Toolbar,
  QuickFilter,
  QuickFilterTrigger,
  QuickFilterControl,
  QuickFilterClear,
  ColumnsPanelTrigger,
  FilterPanelTrigger,
} from "@mui/x-data-grid";
import {
  Box,
  TextField,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import { PropsWithChildren } from "react";

export function CustomToolbar({ children }: PropsWithChildren) {
  return (
    <Toolbar style={{ borderBottom: "none" }}>
      {children}
      <Tooltip title="Select columns">
        <ColumnsPanelTrigger>
          <ViewColumnIcon fontSize="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Columns
          </Typography>
        </ColumnsPanelTrigger>
      </Tooltip>
      <Tooltip title="Show filters">
        <FilterPanelTrigger>
          <FilterListIcon fontSize="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Filters
          </Typography>
        </FilterPanelTrigger>
      </Tooltip>

      <Box flex={1} />
      <QuickFilter expanded>
        <QuickFilterTrigger />
        <QuickFilterControl
          render={({ ref, onChange, onKeyDown, value }) => {
            return (
              <TextField
                ref={ref as React.Ref<HTMLDivElement>}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={value}
                variant="standard"
                aria-label="Search"
                placeholder="Search..."
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                    endAdornment: value ? (
                      <InputAdornment position="end">
                        <QuickFilterClear
                          edge="end"
                          size="small"
                          aria-label="Clear search"
                        >
                          <CancelIcon fontSize="small" />
                        </QuickFilterClear>
                      </InputAdornment>
                    ) : null,
                  },
                }}
              />
            );
          }}
        />
      </QuickFilter>
    </Toolbar>
  );
}
