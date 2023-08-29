import { PropsWithChildren, ReactNode } from "react";
import { Box, Typography } from "@mui/material";

export function BoxContainer(
  props: { useTypography?: boolean; header?: ReactNode } & PropsWithChildren,
) {
  let header;
  if (props.header) {
    header = props.useTypography ? (
      <Typography variant="h2" marginBottom={1}>
        {props.header}
      </Typography>
    ) : (
      props.header
    );
  }

  return (
    <Box mr={2}>
      {header}
      <Box mb={2} display="flex" flexDirection="column">
        {props.children}
      </Box>
    </Box>
  );
}
