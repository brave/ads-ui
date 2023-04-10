import { useAuthContext } from "../../context/auth.hook";

export function useIsAuthenticated() {
  const { isInitialized, isAuthenticated, accessToken, role } =
    useAuthContext();

  if (!isInitialized) {
    return undefined;
  }

  return isAuthenticated && accessToken !== "" && role === "admin";
}
