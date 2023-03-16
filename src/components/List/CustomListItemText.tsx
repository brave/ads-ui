import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import React from "react";

interface Props {
  primary?: string;
  secondary?: string | React.ReactNode;
  error?: string | React.ReactNode;
}

export function CustomListItemText({ primary, secondary, error }: Props) {
  const isError = !!error;

  return (
    <ListItem>
      {isError && (
        <ListItemIcon sx={{ flexWrap: 1 }}>
          <ErrorOutlineIcon sx={{ color: "#d32f2f", mr: 1 }} />
        </ListItemIcon>
      )}
      <ListItemText
        primary={primary}
        secondary={isError ? error : secondary}
        primaryTypographyProps={{
          fontSize: "16px",
          fontFamily: "Poppins",
          color: "grey",
        }}
        secondaryTypographyProps={{
          marginTop: !!primary ? "4px" : "0",
          fontSize: "18px",
          color: "black",
          p: isError ? 1 : 0,
          bgcolor: isError ? "rgb(253, 237, 237)" : "white",
          display: "flex",
          alignItems: "center",
        }}
      />
    </ListItem>
  );
}
