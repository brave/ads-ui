import { useCallback, useState } from "react";
import { useAuthContext } from "@/auth/context/auth.hook";
import { authorize } from "@/auth/lib";

interface Options {
  onCompleted?: () => void;
  onError?: () => void;
}

export function useAuthorize({ onCompleted, onError }: Options) {
  const { setSessionUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const verify = useCallback((code: string, id: string) => {
    authorize({ code, id })
      .then((data) => {
        if (data) {
          setSessionUser(data);
        }
        if (onCompleted) {
          onCompleted();
        }
      })
      .catch((e) => {
        console.error(e.message);
        setError(e.message);
        if (onError) {
          onError();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, error, verify };
}
