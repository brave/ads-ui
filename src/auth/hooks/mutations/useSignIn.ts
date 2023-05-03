import { useCallback, useState } from "react";
import { useAuthContext } from "auth/context/auth.hook";
import { getCredentials } from "auth/lib";

interface Options {
  onError?: (msg: string) => void;
  onSuccess?: () => void;
}

export function useSignIn({ onError, onSuccess }: Options = {}) {
  const { setSessionUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const signIn = useCallback((email: string, password: string) => {
    if (email === "" || password === "") {
      if (onError) onError("Please Fill The Details.");
      return;
    }
    setLoading(true);
    getCredentials({ email, password })
      .then((data) => {
        if (data) {
          setSessionUser(data);

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
