import { createSession } from "checkout/lib";
import { useCallback, useState } from "react";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";

export function useCreateSession() {
  const [loading, setLoading] = useState(false);

  const { advertiser } = useAdvertiser();
  const replaceSession = useCallback(async (campaignId: string) => {
    setLoading(true);
    await createSession(advertiser.id, campaignId ?? "")
      .then((url) => {
        window.location.replace(url);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, []);

  return { replaceSession, loading };
}
