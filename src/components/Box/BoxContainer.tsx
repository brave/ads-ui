import React, { PropsWithChildren } from "react";
import { Box, Container, Typography } from "@mui/material";

export function BoxContainer(
  props: { header?: React.ReactNode } & PropsWithChildren
) {
  return (
    <Box mr={2}>
      {props.header && (
        <Typography variant="h2" marginBottom={1}>
          {props.header}
        </Typography>
      )}
      <Box mb={2}>{props.children}</Box>
    </Box>
  );
}
