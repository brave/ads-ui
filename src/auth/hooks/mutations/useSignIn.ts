import { useCallback, useState } from "react";
import { useAuthContext } from "auth/context/auth.hook";

interface Options {
  onError?: (msg: string) => void;
  onSuccess?: () => void;
}

export function useSignIn({ onError, onSuccess }: Options = {}) {
  const { setAccessToken } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const signIn = useCallback((email: string, password: string) => {
    setLoading(true);
    fetch(`${import.meta.env.REACT_APP_SERVER_ADDRESS}/auth/token`, {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(async (resp) => {
        if (resp.status === 400) {
          throw new Error(
            "The username or password did not match our records. Please try again."
          );
        }

        if (!resp.ok) {
          throw new Error(
            "Unexpected error validating your credentials. Please try again later."
          );
        }

        return await resp.json();
      })
      .then((data: { accessToken: string }) => {
        if (data && data.accessToken) {
          setAccessToken(data.accessToken);

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
