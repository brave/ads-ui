import { IconButton, Tooltip } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import React from "react";
import { useHistory } from "react-router-dom";

export function DashboardIconButton() {
  const history = useHistory();

  return (
    <Tooltip title="Return to dashboard">
      <IconButton onClick={() => history.push("/user/main")}>
        <ArrowBack />
      </IconButton>
    </Tooltip>
  );
}
