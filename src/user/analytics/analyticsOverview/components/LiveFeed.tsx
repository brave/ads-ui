import { Box, Chip, Typography } from "@mui/material";
import { OverviewDetail, StatsMetric } from "../types";
import { toLocaleString } from "util/bignumber";
import { msg, Trans } from "@lingui/macro";
import { MessageDescriptor } from "@lingui/core";
import { useLingui } from "@lingui/react";

interface OverviewProps extends OverviewDetail {
  currency: string;
  budget: number;
}

interface LiveFeedProps {
  overview: OverviewProps;
  processed: StatsMetric;
}

interface Feed {
  label: MessageDescriptor;
  value: string;
}

export default function LiveFeed({ overview, processed }: LiveFeedProps) {
  const { _ } = useLingui();
  const { budget, currency } = overview;
  const realSpend = processed.spend.gte(budget) ? budget : processed.spend;

  const feedValues: Feed[] = [
    {
      label: msg`Click-through rate`,
      value: `${toLocaleString(processed.ctr)}%`,
    },
    {
      label: msg`Site visit rate`,
      value: `${toLocaleString(processed.visitRate)}%`,
    },
    {
      label: msg`Dismissal rate`,
      value: `${toLocaleString(processed.dismissRate)}%`,
    },
    {
      label: msg`Click to site visit rate`,
      value: `${toLocaleString(processed.landingRate)}%`,
    },
    { label: msg`Upvotes`, value: toLocaleString(processed.upvotes) },
    { label: msg`Downvotes`, value: toLocaleString(processed.downvotes) },
    {
      label: msg`Spend`,
      value: `$${toLocaleString(realSpend)} ${currency}`,
    },
    {
      label: msg`Budget`,
      value: `$${toLocaleString(budget)} ${currency}`,
    },
  ];

  if (processed.conversions.gt(0)) {
    feedValues.push(
      {
        label: msg`Conversions`,
        value: toLocaleString(processed.conversions),
      },
      {
        label: msg`View-through Conversions`,
        value: toLocaleString(processed.viewthroughConversion),
      },
      {
        label: msg`Click-through Conversions`,
        value: toLocaleString(processed.clickthroughConversion),
      },
      {
        label: msg`CPA`,
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
      <Typography sx={{ fontWeight: 600 }}>
        <Trans>Key Statistics</Trans>
      </Typography>
      {feedValues.map((f, idx) => (
        <Chip
          label={`${_(f.label)}: ${f.value}`}
          variant="outlined"
          key={idx}
        />
      ))}
    </Box>
  );
}
