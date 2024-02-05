import { Typography } from "@mui/material";
import { MessageDescriptor } from "@lingui/core";
import { Trans } from "@lingui/react";

export function GradientText(props: { text: MessageDescriptor }) {
  return (
    <Typography
      variant="inherit"
      sx={{
        backgroundImage:
          "linear-gradient(96.46deg, #FF2869 -4.13%, #930BFE 82.88%), linear-gradient(0deg, #111317, #111317);",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      <Trans id={props.text.id} />
    </Typography>
  );
}
