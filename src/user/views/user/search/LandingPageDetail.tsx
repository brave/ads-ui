import { SearchProspectsLandingPageDetailFragment } from "@/graphql-client/graphql";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Chip,
  IconButton,
  Popover,
  Skeleton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CountryDomain } from "./types";
import { useQuery } from "@apollo/client";
import { graphql } from "@/graphql-client";
import {} from "@/graphql-client/graphql";
import _ from "lodash";
import { Trans } from "@lingui/macro";

const SearchProspects_LandingPageDetail = graphql(`
  query SearchProspectsLandingPageDetail(
    $domain: String!
    $country: String!
    $url: String!
  ) {
    searchProspects {
      landingPage(country: $country, domain: $domain, url: $url) {
        ...SearchProspectsLandingPageDetail
      }
    }
  }

  fragment SearchProspectsLandingPageDetail on SearchLandingPage {
    url
    queries {
      query
    }
  }
`);

function QueryList({
  queries,
}: {
  queries: SearchProspectsLandingPageDetailFragment["queries"];
}) {
  const [visibleQueryCount, setVisibleQueryCount] = useState(20);

  const numQueries = queries.length;
  const hasMore = numQueries > visibleQueryCount;

  const queriesToShow = queries.slice(0, visibleQueryCount);

  return (
    <>
      {queriesToShow.map((q) => (
        <Chip key={q.query} label={q.query} size="small" />
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

function SkeletonQueryList() {
  return _.range(0, 20).map((i) => (
    <Skeleton key={i} variant="rounded" width={_.random(50, 200)} />
  ));
}

interface Props {
  domain: CountryDomain;
  landingPageUrl: string;
}

export function LandingPageDetail({ landingPageUrl, domain }: Props) {
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
        <LandingPageDetailContent
          domain={domain}
          landingPageUrl={landingPageUrl}
        />
      </Popover>
    </div>
  );
}

function LandingPageDetailContent({
  domain,
  landingPageUrl,
}: {
  domain: CountryDomain;
  landingPageUrl: string;
}) {
  const { data } = useQuery(SearchProspects_LandingPageDetail, {
    variables: {
      country: domain.country,
      domain: domain.domain,
      url: landingPageUrl,
    },
    skip: !landingPageUrl,
  });
  const landingPage = data?.searchProspects.landingPage;

  return (
    <Box sx={{ padding: 2, width: 600, height: 300 }}>
      <Typography variant="h2" gutterBottom>
        <Trans>Full Landing Page URL</Trans>
      </Typography>

      <Typography gutterBottom fontFamily="monospace" fontSize="small">
        {landingPageUrl}
      </Typography>

      <Typography variant="h2" marginTop={2} marginBottom={1}>
        <Trans>Sample Queries</Trans>
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={1} marginBottom={2}>
        {landingPage ? (
          <QueryList queries={landingPage.queries} />
        ) : (
          <SkeletonQueryList />
        )}
      </Box>
    </Box>
  );
}
