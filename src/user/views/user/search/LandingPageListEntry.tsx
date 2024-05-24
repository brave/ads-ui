import { SearchPreview } from "@/components/Creatives/SearchPreview";
import { SearchProspectsLandingPageListFragment } from "@/graphql-client/graphql";
import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
} from "@mui/material";
import React, { DispatchWithoutAction } from "react";
import LoopIcon from "@mui/icons-material/Loop";
import { LandingPageDetail } from "./LandingPageDetail";
import { CountryDomain } from "./types";

interface Props {
  landingPage: SearchProspectsLandingPageListFragment;
  selected: boolean;
  toggleSelection: DispatchWithoutAction;

  creativeIndex: number;
  nextCreative: DispatchWithoutAction;

  hasMultipleCreatives: boolean;

  style: React.CSSProperties;

  domain: CountryDomain;
}

export function LandingPageListEntry({
  landingPage,
  selected,
  toggleSelection,
  creativeIndex,
  nextCreative,
  hasMultipleCreatives,
  domain,
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
        favicon={landingPage.favicon}
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

        <LandingPageDetail landingPageUrl={landingPage.url} domain={domain} />
      </Box>
    </ListItem>
  );
}
