import { useCallback, useState } from "react";
import { useAuthContext } from "auth/context/auth.hook";
import { getCredentials, getLink } from "auth/lib";

interface Options {
  onError?: (msg: string) => void;
  onSuccess?: () => void;
}

export function useGetLink({ onError, onSuccess }: Options = {}) {
  const [loading, setLoading] = useState(false);
  const link = useCallback((email: string) => {
    setLoading(true);
    getLink({ email })
      .then(() => {
        if (onSuccess) {
          onSuccess();
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

  return { link, loading };
}
