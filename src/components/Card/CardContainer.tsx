import React, { PropsWithChildren } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";

export function CardContainer(
  props: { header?: React.ReactNode } & PropsWithChildren
) {
  return (
    <Box mb={4} mt={3}>
      {props.header && (
        <Typography variant="h2" marginBottom={2}>
          {props.header}
        </Typography>
      )}
      <Card>
        <CardContent sx={{ p: 3 }}>{props.children}</CardContent>
      </Card>
    </Box>
  );
}
