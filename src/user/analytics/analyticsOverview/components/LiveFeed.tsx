import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { OverviewDetail, StatsMetric } from "../types";

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
  const realSpend = processed.spend > budget ? budget : processed.spend;

  const feedValues: Feed[] = [
    {
      label: "Click-through rate",
      value: `${processed.ctr.toFixed(2)}%`,
    },
    {
      label: "10s visit rate",
      value: `${processed.visitRate.toFixed(2)}%`,
    },
    {
      label: "Dismissal rate",
      value: `${processed.dismissRate.toFixed(2)}%`,
    },
    {
      label: "Click to 10s visit rate",
      value: `${processed.landingRate.toFixed(2)}%`,
    },
    { label: "Upvotes", value: `${processed.upvotes}` },
    { label: "Downvotes", value: `${processed.downvotes}` },
    {
      label: "Spend",
      value: `${realSpend.toLocaleString()} ${currency}`,
    },
    {
      label: "Budget",
      value: `${budget.toLocaleString()} ${currency}`,
    },
  ];

  if (processed.conversions > 0) {
    feedValues.push(
      {
        label: "Conversions",
        value: `${processed.conversions}`,
      },
      {
        label: "CPA",
        value: `$${processed.cpa.toLocaleString()}`,
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
