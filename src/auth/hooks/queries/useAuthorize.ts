import { useEffect, useState } from "react";
import { useAuthContext } from "@/auth/context/auth.hook";
import { authorize, ResponseUser } from "@/auth/lib";

interface Options {
  variables: {
    code: string;
    id: string;
  };
  onCompleted?: () => void;
  onError?: () => void;
}

export function useAuthorize({ variables, onCompleted, onError }: Options) {
  const { setSessionUser } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<ResponseUser>();

  useEffect(() => {
    authorize(variables)
      .then((data) => {
        if (data) {
          setSessionUser(data);
          setData(data);
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

  return { data, loading, error };
}
