import { Link as RouterLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Props {
  to: string;
  msg: string;
  textColor: string;
}

export function PageLink({ to, msg, textColor }: Props) {
  const isMobile = useIsMobile();

  return (
    <RouterLink to={to} style={{ textDecoration: "none" }}>
      <Typography
        variant={isMobile ? "body2" : "subtitle1"}
        color={isMobile ? "black" : textColor}
      >
        {msg}
      </Typography>
    </RouterLink>
  );
}
