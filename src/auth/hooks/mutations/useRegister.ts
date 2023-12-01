import { useCallback, useState } from "react";
import { RegistrationForm } from "auth/registration/types";
import { sendMarketingEmail, submitRegistration } from "auth/lib";
import { clearRegistrationValues } from "form/PersistRegistrationValues";

export function useRegister() {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const register = useCallback((form: RegistrationForm) => {
    setLoading(true);
    submitRegistration(form)
      .then(() => {
        if (form.marketingOptIn) {
          void sendMarketingEmail({ email: form.email, name: form.fullName });
        }

        setHasRegistered(true);
        clearRegistrationValues();
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return { register, loading, error, hasRegistered };
}
