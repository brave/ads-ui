import { msg } from "@lingui/macro";
import { Stack, Typography } from "@mui/material";
import { Trans } from "@lingui/react";

export function SearchTalkingPoints() {
  const talkingPoints = [
    {
      title: msg`Reach new audiences you're missing`,
      description: msg`New users are switching to Brave Search every single day. Don't miss out on meeting their intent to shop your product or services.`,
    },
    {
      title: msg`Convert customers with AI-powered search ads`,
      description: msg`Brave Search Ads are built to perform and convert as well as - or better than - Google Search Ad clicks.`,
    },
    {
      title: msg`Risk free trial for up to 30 days`,
      description: msg`Try a free one-month test to see how Brave Search Ads perform for your business.`,
    },
  ];

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      spacing={5}
      alignItems="center"
    >
      {talkingPoints.map((point, index) => (
        <Stack spacing={4} maxWidth={350} key={index}>
          <Typography variant="h4" color="white" fontWeight={500}>
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
