import { useCallback, useState } from "react";
import { RegistrationForm } from "auth/registration/types";
import { submitRegistration } from "auth/lib";

export function useRegister() {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const register = useCallback((form: RegistrationForm) => {
    setLoading(true);
    submitRegistration(form)
      .then(() => setHasRegistered(true))
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { register, loading, error, hasRegistered };
}
