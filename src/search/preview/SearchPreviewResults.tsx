import { Box } from "@mui/material";
import { SearchData } from "./data";
import { CardContainer } from "@/components/Card/CardContainer";
import { useBasket } from "@/user/views/user/search/basket";
import { SummaryPanel } from "./SummaryPanel";
import { LandingPageList } from "./LandingPageList";
import { CallToAction } from "./CallToAction";

interface Props {
  data: SearchData;
  hideEstimates: boolean;
  hideBookMeeting: boolean;
}

export function SearchPreviewResults({
  data,
  hideBookMeeting,
  hideEstimates,
}: Props) {
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
          <CallToAction
            domain={data.countryDomain.domain}
            hideBookMeeting={hideBookMeeting}
          />

          <LandingPageList
            landingPages={data.landingPages}
            basket={basket}
            allowSelection={false}
          />
        </CardContainer>

        <Box display="flex" flexDirection="column" gap={2}>
          <SummaryPanel searchData={data} hideEstimates={hideEstimates} />
        </Box>
      </Box>
    </Box>
  );
}
