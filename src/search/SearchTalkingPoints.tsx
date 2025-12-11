import { Stack, Typography } from "@mui/material";

export function SearchTalkingPoints() {
  const talkingPoints = [
    {
      title: "Reach new audiences you&apos;re missing",
      description:
        "New users are switching to Brave Search every single day. Don't miss out on meeting their intent to shop your product or services.",
    },
    {
      title: "Convert customers with AI-powered search ads",
      description:
        "Brave Search Ads are built to perform and convert as well as - or better than - Google Search Ad clicks.",
    },
    {
      title: "Get a free testing period",
      description:
        "Try Brave Search Ads risk-free to see how the ads perform for your website.",
    },
  ];

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      justifyContent={{ xs: "space-between", lg: "space-evenly" }}
      spacing={5}
      alignItems="center"
    >
      {talkingPoints.map((point, index) => (
        <Stack spacing={4} maxWidth={350} key={index}>
          <Typography variant="h4" color="white" fontWeight={500}>
            {point.title}
          </Typography>
          <Typography variant="body1" color="white">
            {point.description}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
