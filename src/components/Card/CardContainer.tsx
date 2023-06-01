import React, { PropsWithChildren } from "react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";

export function CardContainer(
  props: { header: React.ReactNode } & PropsWithChildren
) {
  return (
    <Box mb={3} mt={2}>
      <Typography variant="h2" marginBottom={1}>
        {props.header}
      </Typography>
      <Card>
        <CardContent>{props.children}</CardContent>
      </Card>
    </Box>
  );
}
