import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { increaseCampaignBudget } from "@/checkout/lib/index";

export function useIncreaseCampaignBudget() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { advertiser } = useAdvertiser();
  const replaceSession = useCallback(
    async (campaignId: string, amount: string) => {
      setLoading(true);
      await increaseCampaignBudget(advertiser.id, campaignId, amount)
        .then((url) => {
          window.location.replace(url);
        })
        .catch(() => {
          alert("Unable to create payment session. Please try again.");
          setLoading(false);
          history.push(`/user/main/adsmanager/advanced/${campaignId}/review`);
        });
    },
    [],
  );

  return { createPaymentSession: replaceSession, loading };
}
