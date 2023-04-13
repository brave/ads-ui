import { useCallback } from "react";
import { useAuthContext } from "auth/context/auth.hook";

interface Options {
  onSuccess?: () => void;
}

export function useSignOut({ onSuccess }: Options = {}) {
  const { setAccessToken } = useAuthContext();
  const signOut = useCallback(() => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
    setAccessToken(undefined);

    if (onSuccess) {
      onSuccess();
    }
  }, []);

  return { signOut };
}
