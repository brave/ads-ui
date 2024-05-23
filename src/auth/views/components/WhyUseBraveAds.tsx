import { Stack, Typography } from "@mui/material";
import { Trans, useLingui } from "@lingui/react";
import { PropsWithChildren } from "react";
import { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/macro";

export function WhyUseBraveAds() {
  const { _ } = useLingui();

  return (
    <Stack maxWidth={1200} spacing={3} mt={5} mb={3} flexGrow={1}>
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight={600}
        color="white"
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

      <NumberContainer
        title={msg`Stay Innovative`}
        body={msg`Get discounts on your campaign when you pay with Basic Attention Token.`}
        number={4}
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
      <Typography variant="h1" color="white">
        {props.number}
      </Typography>
      <Stack spacing={1}>
        <Typography variant="h4" color="white" fontWeight={500}>
          <Trans id={props.title.id} />
        </Typography>
        <Typography variant="subtitle1" color="white">
          <Trans id={props.body.id} />
        </Typography>
      </Stack>
    </Stack>
  );
};
