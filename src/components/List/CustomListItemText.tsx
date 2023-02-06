import {ListItem, ListItemIcon, ListItemText} from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import React from "react";

interface Props {
  primary: string;
  secondary: string | React.ReactNode;
  error?: string;
}

export function CustomListItemText({ primary, secondary, error }: Props) {
  const isError = !!error;

  const getError = (text: string) => {
    return (
      <ListItemIcon>
        <ErrorOutlineIcon sx={{ color: "#d32f2f", mr: 1 }} />
        { text }
      </ListItemIcon>
    )
  }

  return (
    <ListItem>
      <ListItemText
        sx={{ mt: 2, mb: 2 }}
        primary={primary}
        secondary={isError ? getError(error) : secondary}

        primaryTypographyProps={{
          fontSize: "16px",
          fontFamily: "Poppins",
          color: "grey",
        }}

        secondaryTypographyProps={{
          marginTop: "4px",
          fontSize: "18px",
          color: "black",
          p: isError ? 1 : 0,
          bgcolor: isError ? "rgb(253, 237, 237)" : "white",
          display: "flex",
          alignItems: "center",
        }}
      />
    </ListItem>
  )
}
