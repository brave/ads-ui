import { ComponentType } from "react";
import { IAdvertiser } from "@/auth/context/auth.interface";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { Redirect, Route } from "react-router-dom";

interface ProtectedProps {
  authedComponent?: ComponentType;
  unauthedComponent?: ComponentType;
  path?: string;
  validateAdvertiserProperty?: (a: IAdvertiser) => boolean;
}

export function ProtectedRoute({
  authedComponent,
  unauthedComponent,
  path,
  validateAdvertiserProperty = () => true,
}: ProtectedProps) {
  const { advertiser } = useAdvertiser();

  if (!advertiser.agreed && unauthedComponent === undefined) {
    return <Redirect to="/user/main" />;
  }

  if (!validateAdvertiserProperty(advertiser)) {
    return <Redirect to="/user/main" />;
  }

  return (
    <Route
      path={path}
      component={advertiser.agreed ? authedComponent : unauthedComponent}
    />
  );
}
