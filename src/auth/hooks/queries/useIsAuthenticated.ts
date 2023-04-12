import { useAuthContext } from "../../context/auth.hook";

export function useIsAuthenticated() {
  const {
    isInitialized,
    isAuthenticated,
    accessToken,
    emailVerified,
    advertiser,
  } = useAuthContext();

  if (!isInitialized) {
    return undefined;
  }

  return (
    isAuthenticated &&
    accessToken !== "" &&
    emailVerified &&
    advertiser.id !== ""
  );
}
