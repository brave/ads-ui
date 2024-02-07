import { useCallback, useState } from "react";
import { getLink } from "auth/lib";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";

interface Options {
  onError?: (msg: string) => void;
  onSuccess?: () => void;
}

export function useGetLink({ onError, onSuccess }: Options = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { _ } = useLingui();

  const requestLink = useCallback(async (email: string) => {
    if (email.trim() === "") {
      setError(_(msg`Please enter an email.`));
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
