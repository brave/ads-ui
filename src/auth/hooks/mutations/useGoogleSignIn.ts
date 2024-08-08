import { useCallback, useState } from "react";
import { useAuthContext } from "@/auth/context/auth.hook";
import { verify } from "@/auth/lib";

interface Options {
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

export function useGoogleSignIn({ onError, onSuccess }: Options = {}) {
  const { setSessionUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const signIn = useCallback((credential: string) => {
    setLoading(true);
    verify(credential)
      .then((data) => {
        if (data) {
          setSessionUser(data);

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
