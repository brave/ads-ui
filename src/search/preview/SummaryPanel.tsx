/* eslint-disable lingui/no-unlocalized-strings */
import { CardContainer } from "@/components/Card/CardContainer";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import PublicIcon from "@mui/icons-material/Public";
import DomainIcon from "@mui/icons-material/Domain";
import { CountryDomain } from "@/user/views/user/search/types";

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
}

export function SummaryPanel({ domain, countryName }: Props) {
  return (
    <CardContainer sx={{ width: 250 }}>
      <Typography variant="h2" marginBottom={2}>
        Campaign Summary
      </Typography>
      <SummaryEntry title="Country" value={countryName} icon={<PublicIcon />} />
      <SummaryEntry
        title="Domain"
        value={domain.domain}
        icon={<DomainIcon />}
      />
    </CardContainer>
  );
}
