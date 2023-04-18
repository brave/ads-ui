import { useAuthContext } from "../../context/auth.hook";

export function useIsAuthenticated() {
  const { isInitialized, isAuthenticated, emailVerified, advertiser, userId } =
    useAuthContext();

  if (!isInitialized) {
    return undefined;
  }

  return isAuthenticated && emailVerified && advertiser.id !== "" && userId;
}
