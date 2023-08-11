import { Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useHistory } from "react-router-dom";

export function DashboardButton() {
  const history = useHistory();

  return (
    <Button
      variant="text"
      startIcon={<ArrowBack />}
      onClick={() => history.replace("/user/main")}
    >
      Dashboard
    </Button>
  );
}
