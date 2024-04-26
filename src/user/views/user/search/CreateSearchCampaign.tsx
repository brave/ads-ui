import { Box, Container, Divider, Typography } from "@mui/material";
import { CountryDomain } from "./types";
import { CardContainer } from "@/components/Card/CardContainer";
import { graphql } from "@/graphql-client";
import { useQuery } from "@apollo/client";
import { LandingPageList } from "./LandingPageList";

const CreateSearchCampaign_LandingPageList = graphql(`
  query CreateSearchCampaign_LandingPageList(
    $domain: String!
    $country: String!
    $offset: Float!
    $limit: Float!
  ) {
    searchProspects {
      landingPagesWithStats(
        country: $country
        domain: $domain
        offset: $offset
        limit: $limit
      ) {
        ...SearchProspects_LandingPageList
      }
    }
  }

  fragment SearchProspects_LandingPageList on SearchLandingPageWithStats {
    url
    rank
    lastSeen
    creatives {
      title
      body
      lastSeen
    }
  }
`);

interface Props {
  domain: CountryDomain;
}

export function CreateSearchCampaign({ domain }: Props) {
  const { data } = useQuery(CreateSearchCampaign_LandingPageList, {
    variables: {
      country: domain.country,
      domain: domain.domain,
      offset: 0,
      limit: 1000,
    },
  });
  return (
    <Container maxWidth="xl">
      <CardContainer>
        <Box>
          <Typography variant="h6" gutterBottom>
            {domain.domain}: {domain.country.toUpperCase()}
          </Typography>
        </Box>
        <Divider />

        <LandingPageList
          landingPages={data?.searchProspects.landingPagesWithStats}
        />
      </CardContainer>
    </Container>
  );
}
