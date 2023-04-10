import { useCallback } from "react";
import { useAuthContext } from "auth/context/auth.hook";

interface Options {
  onSuccess?: () => void;
}

export function useSignOut({ onSuccess }: Options = {}) {
  const { setAccessToken } = useAuthContext();
  const signOut = useCallback(() => {
    setAccessToken(undefined);

    if (onSuccess) {
      onSuccess();
    }
  }, []);

  return { signOut };
}
