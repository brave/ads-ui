import { useAuthContext } from "../../context/auth.hook";

export function useIsAuthenticated() {
  const { isInitialized, isAuthenticated } = useAuthContext();

  if (!isInitialized) {
    return undefined;
  }

  return isAuthenticated;
}
