import { useCallback, useState } from "react";
import { useAuthContext } from "auth/context/auth.hook";
import { clearCredentials } from "../../util";

interface Options {
  onSuccess?: () => void;
  onError?: (msg: string) => void;
}

export function useSignOut({ onSuccess, onError }: Options = {}) {
  const { setAccessToken } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const signOut = useCallback(() => {
    setLoading(true);
    clearCredentials()
      .then(() => {
        setAccessToken(undefined);

        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((e: Error) => {
        if (onError) {
          onError(e.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { signOut, loading };
}
