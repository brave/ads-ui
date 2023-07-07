import { createPaymentSession } from "checkout/lib";
import { useCallback, useState } from "react";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useHistory } from "react-router-dom";

export function useCreatePaymentSession() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { advertiser } = useAdvertiser();
  const replaceSession = useCallback(async (campaignId: string) => {
    setLoading(true);
    await createPaymentSession(advertiser.id, campaignId ?? "")
      .then((url) => {
        window.location.replace(url);
      })
      .catch((e) => {
        alert("Unable to create payment session. Please try again.");
        setLoading(false);
        history.push(`/user/main/adsmanager/advanced/${campaignId}`);
      });
  }, []);

  return { createPaymentSession: replaceSession, loading };
}
