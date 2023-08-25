import { Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";

export function DashboardButton() {
  return (
    <Button
      variant="text"
      startIcon={<ArrowBack />}
      component={RouterLink}
      to="/user/main"
    >
      Dashboard
    </Button>
  );
}
