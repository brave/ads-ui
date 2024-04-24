import { PropsWithChildren, ReactNode } from "react";
import { useRouteMatch, Link as RouterLink } from "react-router-dom";
import { CardContainer } from "@/components/Card/CardContainer";
import { Button } from "@mui/material";
import { Trans } from "@lingui/macro";

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
          <Trans>Edit</Trans>
        </Button>
      }
    >
      {children}
    </CardContainer>
  );
}
