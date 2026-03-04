import { CardContainer } from "@/components/Card/CardContainer";
import { Button } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";

interface Props {
  name: ReactNode;
  path: string;
}

export function ReviewContainer({
  name,
  path,
  children,
}: Props & PropsWithChildren) {
  const { url } = useRouteMatch();
  const baseRoute = url.replace("/review", "");

  return (
    <CardContainer
      header={name}
      additionalAction={
        <Button
          variant="outlined"
          sx={{ borderRadius: "10px" }}
          size="small"
          component={RouterLink}
          to={`${baseRoute}/${path}`}
          replace
        >
          Edit
        </Button>
      }
    >
      {children}
    </CardContainer>
  );
}
