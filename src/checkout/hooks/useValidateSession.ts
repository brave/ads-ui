import { useEffect, useState } from "react";
import { buildAdServerEndpoint } from "util/environment";
import {
  loadCampaignAds,
  updateCampaign,
  updateNotification,
} from "user/library";
import { UpdateNotificationCreativeInput } from "graphql/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useUser } from "auth/hooks/queries/useUser";

interface Props {
  sessionId: string | null;
  campaignId: string | null;
}

export function useValidateSession(props: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { advertiser } = useAdvertiser();
  const { userId } = useUser();

  useEffect(() => {
    const fetchSession = async (session: string, campaign: string) => {
      const res = await fetch(
        buildAdServerEndpoint(`/ads/checkout-session?sessionId=${session}`),
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );

      if (res.status !== 200) {
        throw new Error("invalid session");
      }

      const { paymentIntent } = await res.json();
      const createdAds = await loadCampaignAds(campaign);

      for (const adSets of createdAds.adSets) {
        for (const ad of adSets.ads ?? []) {
          const notification: UpdateNotificationCreativeInput = {
            userId: userId,
            advertiserId: advertiser.id,
            state: "under_review",
            creativeId: ad.creative.id,
          };
          await updateNotification(notification);
        }
      }

      await updateCampaign({
        id: campaign,
        state: "under_review",
        stripePaymentId: paymentIntent,
        advertiserId: advertiser.id,
      });
    };

    if (props.sessionId && props.campaignId) {
      setLoading(true);
      fetchSession(props.sessionId, props.campaignId)
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.sessionId, props.campaignId]);

  return { loading, error };
}
