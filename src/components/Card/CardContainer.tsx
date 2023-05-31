import React, { PropsWithChildren } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";

export function CardContainer(
  props: { header: React.ReactNode } & PropsWithChildren
) {
  return (
    <Card>
      <CardHeader title={props.header} />
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}
