import { useCallback, useState } from "react";
import { useAuthContext } from "auth/context/auth.hook";
import { getCredentials } from "../../util";

interface Options {
  onError?: (msg: string) => void;
  onSuccess?: () => void;
}

export function useSignIn({ onError, onSuccess }: Options = {}) {
  const { setAccessToken } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const signIn = useCallback((email: string, password: string) => {
    setLoading(true);
    getCredentials("POST", { email, password })
      .then((data) => {
        if (data && data.accessToken) {
          setAccessToken(data.accessToken);

          if (onSuccess) {
            onSuccess();
          }
        }
      })
      .catch((e) => {
        if (onError) {
          onError(e.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { signIn, loading };
}
