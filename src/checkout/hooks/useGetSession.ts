import { useEffect, useState } from "react";
import { buildAdServerEndpoint } from "util/environment";
import {
  creativeInput,
  loadCampaignAds,
  updateCampaign,
  updateNotification,
} from "user/library";
import { UpdateNotificationCreativeInput } from "graphql/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useUser } from "auth/hooks/queries/useUser";

interface Props {
  sessionId: string | null;
  campaignId: string;
}

interface Payment {
  intent: string;
}

export function useValidateSession(props: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<Payment>();
  const { advertiser } = useAdvertiser();
  const { userId } = useUser();

  useEffect(() => {
    const fetchSession = async (id: string) => {
      const res = await fetch(
        buildAdServerEndpoint(`/ads/checkout-session?sessionId=${id}`),
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
      const createdAds = await loadCampaignAds(props.campaignId);

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
        id: props.campaignId,
        state: "under_review",
        stripePaymentId: paymentIntent,
        advertiserId: advertiser.id,
      });
      return { paymentIntent };
    };

    if (props.sessionId) {
      setLoading(true);
      fetchSession(props.sessionId)
        .then((r) => {
          setData({
            intent: r.paymentIntent,
          });
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.sessionId]);

  return { data, loading, error };
}
