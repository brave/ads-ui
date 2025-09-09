import { useCallback, useState } from "react";
import { useAuthContext } from "@/auth/context/auth.hook";
import { getAdvertiserMessage, getCredentials } from "@/auth/lib";

interface Options {
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

export function useSignIn({ onError, onSuccess }: Options = {}) {
  const { setSessionUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const signIn = useCallback((email: string, password: string) => {
    setLoading(true);
    getCredentials({ email, password })
      .then(async (data) => {
        if (data) {
          const advertiserMessageResp = await getAdvertiserMessage();
          setSessionUser({ ...data, ...advertiserMessageResp });
          if (onSuccess) {
            onSuccess();
          }
        }
      })
      .catch((e) => {
        setError(e.message);
        if (onError) {
          onError(e.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { signIn, loading, error };
}
