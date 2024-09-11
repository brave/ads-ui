/* eslint-disable lingui/no-unlocalized-strings */
import { CardContainer } from "@/components/Card/CardContainer";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import PublicIcon from "@mui/icons-material/Public";
import DomainIcon from "@mui/icons-material/Domain";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PanToolAltOutlinedIcon from "@mui/icons-material/PanToolAltOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PercentIcon from "@mui/icons-material/Percent";
import ArticleIcon from "@mui/icons-material/Article";
import { SearchData } from "./data";
import { formatWholeNumber } from "@/user/library/format";

function SummaryEntry({
  title,
  value,
  icon,
}: {
  title: string;
  value: ReactNode;
  icon: ReactNode;
}) {
  return (
    <Box display="flex" alignItems="center" gap={2} marginY={1}>
      {icon}

      <Box>
        <Typography
          component="div"
          variant="body2"
          color="text.secondary"
          marginBottom="-1px"
        >
          {title}
        </Typography>
        <Typography component="div" variant="body2">
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

interface Props {
  searchData: SearchData;
  hideEstimates: boolean;
}

export function SummaryPanel({ searchData, hideEstimates }: Props) {
  return (
    <CardContainer sx={{ width: 250 }}>
      <Typography variant="h2" marginBottom={1}>
        Campaign summary
      </Typography>
      <SummaryEntry
        title="Country"
        value={searchData.fullCountryName}
        icon={<PublicIcon sx={{ color: "text.secondary" }} />}
      />
      <SummaryEntry
        title="Domain"
        value={searchData.countryDomain.domain}
        icon={<DomainIcon sx={{ color: "text.secondary" }} />}
      />
      <SummaryEntry
        title="Landing Pages"
        value={formatWholeNumber(searchData.estimates.landingPages)}
        icon={<ArticleIcon sx={{ color: "text.secondary" }} />}
      />

      {!hideEstimates && (
        <>
          <Typography variant="h2" marginTop={3} marginBottom={1}>
            Estimated weekly results
          </Typography>
          <SummaryEntry
            title="Impressions"
            value={formatWholeNumber(searchData.estimates.qpw.max)}
            icon={<VisibilityOutlinedIcon sx={{ color: "text.secondary" }} />}
          />
          <SummaryEntry
            title="Clicks"
            value={formatWholeNumber(searchData.estimates.cpw.max)}
            icon={<PanToolAltOutlinedIcon sx={{ color: "text.secondary" }} />}
          />
          <SummaryEntry
            title="Click-through rate"
            value="10%"
            icon={<PercentIcon sx={{ color: "text.secondary" }} />}
          />

          <SummaryEntry
            title="Cost"
            icon={
              <MonetizationOnOutlinedIcon sx={{ color: "text.secondary" }} />
            }
            value={
              <Box display="flex" gap={1} alignItems="center">
                <Box
                  color="primary.contrastText"
                  bgcolor="primary.main"
                  padding={"2px 4px"}
                  borderRadius={1}
                  textTransform="uppercase"
                  whiteSpace="nowrap"
                  fontSize={"0.6rem"}
                >
                  Trial Available
                </Box>
              </Box>
            }
          />

          <Typography
            variant="caption"
            color="text.secondary"
            marginTop={2}
            fontSize="0.6rem"
          >
            Estimates only. Actual volume may vary.
          </Typography>
        </>
      )}
    </CardContainer>
  );
}
