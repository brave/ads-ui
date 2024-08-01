import { useIsAuthenticated } from "@/auth/hooks/queries/useIsAuthenticated";
import { Redirect, Switch } from "react-router-dom";

export function UserRedirect() {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated === undefined) {
    return null;
  }

  if (isAuthenticated) {
    return (
      <Switch>
        <Redirect to="/user/main" />
      </Switch>
    );
  }

  return null;
}
