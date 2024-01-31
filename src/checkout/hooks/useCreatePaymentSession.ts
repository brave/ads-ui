import { createPaymentSession } from "checkout/lib";
import { useCallback, useState } from "react";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useHistory } from "react-router-dom";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";

export function useCreatePaymentSession() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { _ } = useLingui();

  const { advertiser } = useAdvertiser();
  const replaceSession = useCallback(async (campaignId: string) => {
    setLoading(true);
    await createPaymentSession(advertiser.id, campaignId ?? "")
      .then((url) => {
        window.location.replace(url);
      })
      .catch(() => {
        alert(_(msg`Unable to create payment session. Please try again.`));
        setLoading(false);
        history.push(`/user/main/adsmanager/advanced/${campaignId}/review`);
      });
  }, []);

  return { createPaymentSession: replaceSession, loading };
}
