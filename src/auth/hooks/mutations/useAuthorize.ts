import { useCallback, useState } from "react";
import { useAuthContext } from "auth/context/auth.hook";
import { authorize, getCredentials } from "auth/lib";

interface Options {
  onError?: (msg: string) => void;
  onSuccess?: () => void;
}

export function useAuthorize({ onError, onSuccess }: Options = {}) {
  const { setSessionUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const auth = useCallback((code: string, id: string) => {
    setLoading(true);
    authorize({ code, id })
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

  return { auth, loading };
}
