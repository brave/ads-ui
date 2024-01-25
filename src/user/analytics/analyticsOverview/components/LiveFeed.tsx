import { Box, Chip, Typography } from "@mui/material";
import { OverviewDetail, StatsMetric } from "../types";
import { toLocaleString } from "util/bignumber";

interface OverviewProps extends OverviewDetail {
  currency: string;
  budget: number;
}

interface LiveFeedProps {
  overview: OverviewProps;
  processed: StatsMetric;
}

interface Feed {
  label: string;
  value: string;
}

export default function LiveFeed({ overview, processed }: LiveFeedProps) {
  const { budget, currency } = overview;
  const realSpend = processed.spend.gte(budget) ? budget : processed.spend;

  const feedValues: Feed[] = [
    {
      label: "Click-through rate",
      value: `${toLocaleString(processed.ctr)}%`,
    },
    {
      label: "Site visit rate",
      value: `${toLocaleString(processed.visitRate)}%`,
    },
    {
      label: "Dismissal rate",
      value: `${toLocaleString(processed.dismissRate)}%`,
    },
    {
      label: "Click to site visit rate",
      value: `${toLocaleString(processed.landingRate)}%`,
    },
    { label: "Upvotes", value: toLocaleString(processed.upvotes) },
    { label: "Downvotes", value: toLocaleString(processed.downvotes) },
    {
      label: "Spend",
      value: `$${toLocaleString(realSpend)} ${currency}`,
    },
    {
      label: "Budget",
      value: `$${toLocaleString(budget)} ${currency}`,
    },
  ];

  if (processed.conversions.gt(0)) {
    feedValues.push(
      {
        label: "Conversions",
        value: toLocaleString(processed.conversions),
      },
      {
        label: "View-through Conversions",
        value: toLocaleString(processed.viewthroughConversion),
      },
      {
        label: "Click-through Conversions",
        value: toLocaleString(processed.clickthroughConversion),
      },
      {
        label: "CPA",
        value: `$${toLocaleString(processed.cpa)} ${currency}`,
      },
    );
  }

  return (
    <Box
      flexDirection="row"
      alignItems="center"
      justifyContent="space-evenly"
      flexWrap="wrap"
      display="flex"
      gap="5px"
      p={2}
    >
      <Typography sx={{ fontWeight: 600 }}>Key Statistics</Typography>
      {feedValues.map((f, idx) => (
        <Chip label={`${f.label}: ${f.value}`} variant="outlined" key={idx} />
      ))}
    </Box>
  );
}
