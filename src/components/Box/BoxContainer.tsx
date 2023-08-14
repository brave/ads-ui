import { PropsWithChildren, ReactNode } from "react";
import { Box, Typography } from "@mui/material";

export function BoxContainer(
  props: { header?: ReactNode } & PropsWithChildren,
) {
  return (
    <Box mr={2}>
      {props.header && (
        <Typography variant="h2" marginBottom={1}>
          {props.header}
        </Typography>
      )}
      <Box mb={2} display="flex">
        {props.children}
      </Box>
    </Box>
  );
}
