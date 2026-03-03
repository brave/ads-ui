import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { createPaymentSession } from "@/checkout/lib";
import { PaymentType } from "@/graphql-client/graphql";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";

export function useCreatePaymentSession() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { advertiser } = useAdvertiser();
  const replaceSession = useCallback(
    async (campaignId: string, paymentMethod?: PaymentType) => {
      setLoading(true);
      await createPaymentSession(advertiser.id, campaignId ?? "", paymentMethod)
        .then((url) => {
          window.location.replace(url);
        })
        .catch(() => {
          alert("Unable to create payment session. Please try again.");
          setLoading(false);
          history.push(`/user/main/adsmanager/advanced/${campaignId}/review`);
        });
    },
    [advertiser.id, history],
  );

  return { createPaymentSession: replaceSession, loading };
}
