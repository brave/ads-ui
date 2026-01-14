import { useCallback, useState } from "react";
import { RegistrationForm } from "@/auth/registration/types";
import { sendMarketingEmail, submitRegistration } from "@/auth/lib";
import { clearRegistrationValues } from "@/form/PersistRegistrationValues";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { useHistory } from "react-router-dom";

export function useRegister() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { trackMatomoEvent } = useTrackMatomoEvent();

  const register = useCallback(
    (form: RegistrationForm, type: "search" | "browser") => {
      setLoading(true);
      submitRegistration(form, type)
        .then(() => {
          if (form.marketingOptIn) {
            void sendMarketingEmail({ ...form.user });
          }

          trackMatomoEvent("registration", "submit-success");
          clearRegistrationValues();
          history.replace("/register/complete");
        })
        .catch(() => {
          alert("Unable to submit registration");
          trackMatomoEvent("registration", "submit-error");
        })
        .finally(() => setLoading(false));
    },
    [history, trackMatomoEvent],
  );

  return { register, loading };
}
