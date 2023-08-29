import { useCallback, useState } from "react";
import { getLink } from "auth/lib";

interface Options {
  onError?: (msg: string) => void;
  onSuccess?: () => void;
}

export function useGetLink({ onError, onSuccess }: Options = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const requestLink = useCallback(async (email: string) => {
    if (email.trim() === "") {
      setError("Please enter an email.");
      return;
    }

    setError(undefined);
    setLoading(true);
    await getLink({ email })
      .then(() => {
        if (onSuccess) {
          onSuccess();
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

  return { requestLink, loading, error };
}
