import { useCallback, useState } from "react";
import { RegistrationForm } from "auth/registration/types";
import { sendMarketingEmail, submitRegistration } from "auth/lib";
import { clearRegistrationValues } from "form/PersistRegistrationValues";
import { useTrackMatomoEvent } from "hooks/useTrackWithMatomo";
import { t } from "@lingui/macro";
import { useHistory } from "react-router-dom";

export function useRegister(props: { legacy?: boolean } = {}) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { trackMatomoEvent } = useTrackMatomoEvent();

  const register = useCallback(
    (form: RegistrationForm, type: "search" | "browser") => {
      setLoading(true);
      submitRegistration(form, type, props.legacy)
        .then(() => {
          if (form.marketingOptIn) {
            void sendMarketingEmail({ ...form.user });
          }

          trackMatomoEvent("registration", "submit-success");
          clearRegistrationValues();
          history.replace("/register/complete");
        })
        .catch(() => {
          alert(t`Unable to submit registration`);
          trackMatomoEvent("registration", "submit-error");
        })
        .finally(() => setLoading(false));
    },
    [props.legacy],
  );

  return { register, loading };
}
