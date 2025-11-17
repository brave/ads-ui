import { CardContainer } from "@/components/Card/CardContainer";
import { CountryDomain } from "./types";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import PublicIcon from "@mui/icons-material/Public";
import DomainIcon from "@mui/icons-material/Domain";
import PanToolAltOutlinedIcon from "@mui/icons-material/PanToolAltOutlined";
import GridViewIcon from "@mui/icons-material/GridView";

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
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

interface Props {
  domain: CountryDomain;
  countryName: string;
  selectedCount: number | undefined;
  totalCount: number | undefined;
}

export function SummaryPanel({
  domain,
  countryName,
  selectedCount,
  totalCount,
}: Props) {
  return (
    <CardContainer sx={{ width: 250 }}>
      <Typography variant="h2" marginBottom={2}>
        Campaign Summary
      </Typography>
      <SummaryEntry
        title={"Country"}
        value={countryName}
        icon={<PublicIcon />}
      />
      <SummaryEntry
        title={"Domain"}
        value={domain.domain}
        icon={<DomainIcon />}
      />
      <SummaryEntry
        title={"Selected ads"}
        value={
          selectedCount && totalCount ? (
            <span>
              {selectedCount.toLocaleString()}/{totalCount.toLocaleString()}
            </span>
          ) : (
            "..."
          )
        }
        icon={<GridViewIcon />}
      />
      <SummaryEntry
        title={"Cost per click"}
        value="$1.00"
        icon={<PanToolAltOutlinedIcon />}
      />
      {/* <SummaryEntry
        title={"Estimated Impressions"}
        value="999,999 per week"
        icon={<PanToolAltOutlinedIcon />}
      /> */}
    </CardContainer>
  );
}
