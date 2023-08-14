import { PropsWithChildren } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { CardContainer } from "components/Card/CardContainer";
import { Button } from "@mui/material";

interface Props {
  name: string;
  path: string;
}

export function ReviewContainer({
  name,
  path,
  children,
}: Props & PropsWithChildren) {
  const history = useHistory();
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
          onClick={() => history.replace(`${baseRoute}/${path}`)}
        >
          Edit
        </Button>
      }
    >
      {children}
    </CardContainer>
  );
}
