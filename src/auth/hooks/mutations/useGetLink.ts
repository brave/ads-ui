import { useCallback, useState } from "react";
import { getLink } from "@/auth/lib";
import { t } from "@lingui/macro";

interface Options {
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

export function useGetLink({ onError, onSuccess }: Options = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const requestLink = useCallback(async (email: string) => {
    if (email.trim() === "") {
      setError(t`Please enter an email.`);
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
