import { SearchPreview } from "@/components/Creatives/SearchPreview";
import { Box, IconButton, ListItem } from "@mui/material";
import React, { DispatchWithoutAction } from "react";
import LoopIcon from "@mui/icons-material/Loop";
import { LandingPageDetail } from "./LandingPageDetail";
import { LandingPageInfo } from "./data";

interface Props {
  landingPage: LandingPageInfo;

  creativeIndex: number;
  nextCreative: DispatchWithoutAction;

  hasMultipleCreatives: boolean;

  style: React.CSSProperties;

  allowSelection: boolean;
}

export function LandingPageListEntry({
  landingPage,
  creativeIndex,
  nextCreative,
  hasMultipleCreatives,
  style,
}: Props) {
  return (
    <ListItem sx={{ height: 200 }} component="div" style={style}>
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

        <LandingPageDetail landingPage={landingPage} />
      </Box>
    </ListItem>
  );
}
