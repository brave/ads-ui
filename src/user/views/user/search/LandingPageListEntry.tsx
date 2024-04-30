import { SearchPreview } from "@/components/Creatives/SearchPreview";
import { SearchProspects_LandingPageListFragment } from "@/graphql-client/graphql";
import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import React, { DispatchWithoutAction } from "react";
import LoopIcon from "@mui/icons-material/Loop";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  landingPage: SearchProspects_LandingPageListFragment;
  selected: boolean;
  toggleSelection: DispatchWithoutAction;

  creativeIndex: number;
  nextCreative: DispatchWithoutAction;

  hasMultipleCreatives: boolean;

  style: React.CSSProperties;
}

export function LandingPageListEntry({
  landingPage,
  selected,
  toggleSelection,
  creativeIndex,
  nextCreative,
  hasMultipleCreatives,
  style,
}: Props) {
  return (
    <ListItem sx={{ height: 200 }} component="div" style={style}>
      <ListItemIcon sx={{ minWidth: 40 }}>
        <Checkbox edge="start" checked={selected} onChange={toggleSelection} />
      </ListItemIcon>
      <SearchPreview
        title={landingPage.creatives[creativeIndex].title}
        body={landingPage.creatives[creativeIndex].body ?? ""}
        targetUrl={landingPage.url}
      />

      <Box display="flex" flexDirection="column" marginLeft={1}>
        <IconButton
          edge="end"
          aria-label="change"
          onClick={nextCreative}
          disabled={!hasMultipleCreatives}
        >
          <LoopIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="details"
          onClick={() =>
            // eslint-disable-next-line lingui/no-unlocalized-strings
            alert(`TODO: show details box for ${landingPage.url}`)
          }
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </ListItem>
  );
}
