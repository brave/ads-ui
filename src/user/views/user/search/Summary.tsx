import { CardContainer } from "@/components/Card/CardContainer";
import { CountryDomain } from "./types";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Basket } from "./basket";
import PublicIcon from "@mui/icons-material/Public";
import DomainIcon from "@mui/icons-material/Domain";
import PanToolAltOutlinedIcon from "@mui/icons-material/PanToolAltOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

function SummaryEntry({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
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
  basket: Basket;
}

export function Summary({ domain, countryName }: Props) {
  const { _ } = useLingui();

  return (
    <CardContainer sx={{ width: 250 }}>
      <Typography variant="h2" marginBottom={2}>
        <Trans>Campaign Summary</Trans>
      </Typography>
      <SummaryEntry
        title={_(msg`Country`)}
        value={countryName}
        icon={<PublicIcon />}
      />
      <SummaryEntry
        title={_(msg`Domain`)}
        value={domain.domain}
        icon={<DomainIcon />}
      />
      <SummaryEntry
        title={_(msg`Cost per click`)}
        value="$1.00"
        icon={<PanToolAltOutlinedIcon />}
      />
      <SummaryEntry
        title={_(msg`Unique ads`)}
        value="TODO"
        icon={<GridViewIcon />}
      />
    </CardContainer>
  );
}
