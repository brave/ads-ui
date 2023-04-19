import { useCallback, useState } from "react";
import { useAuthContext } from "auth/context/auth.hook";
import { clearCredentials } from "../../lib";

interface Options {
  onSuccess?: () => void;
  onError?: (msg: string) => void;
}

export function useSignOut({ onSuccess, onError }: Options = {}) {
  const [loading, setLoading] = useState(false);
  const { setSessionUser } = useAuthContext();

  const signOut = useCallback(() => {
    setLoading(true);
    clearCredentials()
      .then(() => {
        setSessionUser(undefined);

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
