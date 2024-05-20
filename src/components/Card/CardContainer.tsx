import { PropsWithChildren, ReactNode } from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";

export function CardContainer(
  props: {
    header?: ReactNode;
    additionalAction?: ReactNode;
    sx?: SxProps;
    childSx?: SxProps;
    useTypography?: boolean;
  } & PropsWithChildren,
) {
  return (
    <Box mb={1} mt={2} sx={props.sx}>
      {(props.header || props.additionalAction) && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          {props.header && props.useTypography !== false && (
            <Typography variant="h2">{props.header}</Typography>
          )}
          {props.useTypography === false && <>{props.header}</>}
          {props.additionalAction && <Box>{props.additionalAction}</Box>}
        </Stack>
      )}
      <Card>
        <CardContent sx={{ p: 3, ...props.childSx }}>
          {props.children}
        </CardContent>
      </Card>
    </Box>
  );
}
