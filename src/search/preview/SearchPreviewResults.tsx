import { Box } from "@mui/material";
import { SearchData } from "./data";
import { CardContainer } from "@/components/Card/CardContainer";
import { useBasket } from "@/user/views/user/search/basket";
import { SummaryPanel } from "./SummaryPanel";
import { LandingPageList } from "./LandingPageList";
import { CallToAction } from "./CallToAction";

/* eslint-disable lingui/no-unlocalized-strings */

interface Props {
  data: SearchData;
}

export function SearchPreviewResults({ data }: Props) {
  // we don't actually use the basket
  const basket = useBasket();
  return (
    <Box sx={{ marginLeft: "auto", marginRight: "auto", maxWidth: "1005px" }}>
      <Box display="flex" gap={2}>
        <CardContainer
          childSx={{
            width: "740px",
            height: "calc(100vh - 110px)",
          }}
        >
          <CallToAction domain={data.countryDomain.domain} />

          <LandingPageList
            landingPages={data.landingPages}
            basket={basket}
            allowSelection={false}
          />
        </CardContainer>

        <Box display="flex" flexDirection="column" gap={2}>
          <SummaryPanel searchData={data} />
        </Box>
      </Box>
    </Box>
  );
}
