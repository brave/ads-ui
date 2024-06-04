import { msg } from "@lingui/macro";
import { Stack, Typography } from "@mui/material";
import { Trans } from "@lingui/react";

export function SearchTalkingPoints() {
  const talkingPoints = [
    {
      title: msg`Incremental`,
      description: msg`Brave Search Ads can reach audiences who use ad blockers, and don’t use traditional search engines.`,
    },
    {
      title: msg`As effective as Google`,
      description: msg`Brave Search Ads convert as well as—or better than—Google Search ad clicks.`,
    },
    {
      title: msg`Risk Free`,
      description: msg`Try a free one-month test to see how Brave Search Ads perform for your brand.`,
    },
  ];

  return (
    <Stack
      direction={{ md: "column", lg: "row" }}
      gap={"20px"}
      mt={5}
      justifyContent="space-between"
    >
      {talkingPoints.map((point, index) => (
        <Stack spacing={1} maxWidth={500} key={index}>
          <Typography variant="h6" color="white">
            <Trans id={point.title.id} />
          </Typography>
          <Typography variant="body1" color="white">
            <Trans id={point.description.id} />
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
