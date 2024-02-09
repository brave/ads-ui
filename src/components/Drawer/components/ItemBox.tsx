import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Trans } from "@lingui/react";
import { MessageDescriptor } from "@lingui/core";
import { MouseEvent, ReactNode } from "react";

export type RouteOption = {
  label: MessageDescriptor;
  href: string;
  icon: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<any>) => void;
};

export const ItemBox = (props: RouteOption) => {
  const match = useRouteMatch();
  return (
    <ListItemButton
      component={RouterLink}
      to={props.href}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "0px",
        gap: "3px",
        visibility: props.disabled ? "hidden" : "visible",
        paddingLeft: "3px",
        paddingRight: "3px",
      }}
      selected={match.url.includes(props.href)}
      onClick={props.onClick}
    >
      <ListItemIcon sx={{ minWidth: "unset" }}>{props.icon}</ListItemIcon>
      <ListItemText disableTypography>
        <Typography textAlign="center" variant="caption" fontWeight={500}>
          <Trans id={props.label.id} />
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};
