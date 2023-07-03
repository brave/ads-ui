import React, { PropsWithChildren } from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export function CardContainer(
  props: {
    header?: string;
    additionalAction?: React.ReactNode;
  } & PropsWithChildren
) {
  return (
    <Box mb={1} mt={2}>
      {(props.header || props.additionalAction) && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          {props.header && <Typography variant="h2">{props.header}</Typography>}
          {props.additionalAction && <Box>{props.additionalAction}</Box>}
        </Stack>
      )}
      <Card>
        <CardContent sx={{ p: 1 }}>{props.children}</CardContent>
      </Card>
    </Box>
  );
}
