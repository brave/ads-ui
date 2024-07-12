/* eslint-disable lingui/no-unlocalized-strings */
import SearchIcon from "@mui/icons-material/Search";
import { Box, Chip, IconButton, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { LandingPageInfo, useKeywordData } from "./data";
import dayjs from "dayjs";
import { SkeletonQueryList } from "@/user/views/user/search/LandingPageDetail";

function QueryList({ queries }: { queries: string[] }) {
  const [visibleQueryCount, setVisibleQueryCount] = useState(20);

  const numQueries = queries.length;
  const hasMore = numQueries > visibleQueryCount;

  const queriesToShow = queries.slice(0, visibleQueryCount);

  return (
    <>
      {queriesToShow.map((q) => (
        <Chip key={q} label={q} size="small" />
      ))}

      {hasMore && (
        <Chip
          size="small"
          variant="outlined"
          color="primary"
          label={`more`}
          onClick={() => setVisibleQueryCount((c) => c + 50)}
        />
      )}
    </>
  );
}

interface Props {
  landingPage: LandingPageInfo;
}

export function LandingPageDetail({ landingPage }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton edge="end" aria-label="details" onClick={handleClick}>
        <SearchIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        sx={{
          minHeight: 200,
        }}
      >
        <LandingPageDetailContent landingPage={landingPage} />
      </Popover>
    </div>
  );
}

function LandingPageDetailContent({
  landingPage,
}: {
  landingPage: LandingPageInfo;
}) {
  const { data: queries } = useKeywordData(landingPage.slug, landingPage.url);

  return (
    <Box sx={{ padding: 2, width: 600, height: 300 }}>
      <Typography variant="h2" gutterBottom>
        Full Landing Page URL
      </Typography>

      <Typography gutterBottom fontFamily="monospace" fontSize="small">
        {landingPage.url}
      </Typography>

      <Typography variant="caption" gutterBottom>
        Last seen {dayjs(landingPage.lastSeen).fromNow()}
      </Typography>

      <Typography variant="h2" marginTop={2} marginBottom={1}>
        Sample Queries
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={1} marginBottom={2}>
        {queries ? <QueryList queries={queries} /> : <SkeletonQueryList />}
      </Box>
    </Box>
  );
}
