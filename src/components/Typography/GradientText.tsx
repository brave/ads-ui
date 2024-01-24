import { Typography } from "@mui/material";

export function GradientText(props: { text: string }) {
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
      {props.text}
    </Typography>
  );
}
