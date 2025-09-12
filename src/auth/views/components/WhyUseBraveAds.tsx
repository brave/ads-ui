import { Stack, Typography } from "@mui/material";
import { Trans, useLingui } from "@lingui/react";
import { PropsWithChildren } from "react";
import { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/macro";

export function WhyUseBraveAds() {
  const { _ } = useLingui();

  return (
    <Stack
      maxWidth={1200}
      spacing={3}
      mt={5}
      mb={3}
      flexGrow={1}
      paddingX={{ xs: 2, md: 1, xl: 0 }}
    >
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={600}
        justifySelf="center"
      >
        {_(msg`Why use Brave Ads?`)}
      </Typography>

      <NumberContainer
        title={msg`Escape the low CTR of display banners`}
        body={msg`Brave Ads deliver at the browser or search level, in dedicated placements that give your brand more spotlight and better engagement.`}
        number={1}
      />

      <NumberContainer
        title={msg`Augment your marketing strategy`}
        body={msg`Reach 70+ million highly engaged, otherwise unreachable users.`}
        number={2}
      />

      <NumberContainer
        title={msg`Start fast and experiment`}
        body={msg`For businesses of all sizes. Create your campaign in minutes, starting with as little as $500 per month.`}
        number={3}
      />
    </Stack>
  );
}

const NumberContainer = (
  props: PropsWithChildren & {
    title: MessageDescriptor;
    body: MessageDescriptor;
    number: number;
  },
) => {
  return (
    <Stack
      direction="row"
      alignItems="start"
      maxWidth={600}
      spacing={2}
      alignSelf={props.number % 2 === 0 ? "flex-end" : "flex-start"}
    >
      <Typography
        variant="h1"
        sx={{
          backgroundImage:
            "linear-gradient(96.46deg, #FF2869 -4.13%, #930BFE 82.88%), linear-gradient(0deg, #111317, #111317);",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {props.number}
      </Typography>
      <Stack spacing={1}>
        <Typography variant="h4" fontWeight={500}>
          <Trans id={props.title.id} />
        </Typography>
        <Typography variant="subtitle1">
          <Trans id={props.body.id} />
        </Typography>
      </Stack>
    </Stack>
  );
};
