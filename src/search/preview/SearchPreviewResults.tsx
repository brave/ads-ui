import { Box, Container } from "@mui/material";
import { SearchData } from "./data";
import { CardContainer } from "@/components/Card/CardContainer";
import { useBasket } from "@/user/views/user/search/basket";
import { SummaryPanel } from "./SummaryPanel";
import { LandingPageList } from "./LandingPageList";

/* eslint-disable lingui/no-unlocalized-strings */

interface Props {
  data: SearchData;
}

export function SearchPreviewResults({ data }: Props) {
  // we don't actually use the basket
  const basket = useBasket();
  return (
    <Container
      maxWidth={false}
      sx={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1055px" }}
    >
      <Box display="flex" gap={2}>
        <CardContainer
          childSx={{
            width: "740px",
            height: "calc(100vh - 110px)",
          }}
        >
          <LandingPageList
            landingPages={data.landingPages}
            basket={basket}
            allowSelection={false}
          />
        </CardContainer>

        <Box display="flex" flexDirection="column" gap={3}>
          <SummaryPanel
            domain={data.countryDomain}
            countryName={data.fullCountryName}
          />
        </Box>
      </Box>
    </Container>
  );
}
