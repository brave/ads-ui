import { useEffect, useState } from "react";
import { buildAdServerEndpoint } from "util/environment";
import {
  loadCampaignAds,
  updateCampaign,
  updateNotification,
} from "user/library";
import {
  UpdateCampaignInput,
  UpdateNotificationCreativeInput,
} from "graphql/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useUser } from "auth/hooks/queries/useUser";

interface Props {
  sessionId: string | null;
  campaignId: string;
}

export function useValidateSession(props: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { advertiser } = useAdvertiser();
  const { userId } = useUser();

  useEffect(() => {
    const fetchSession = async (sessionId: string) => {
      let input: UpdateCampaignInput = {
        id: props.campaignId,
        state: "under_review",
        advertiserId: advertiser.id,
      };

      if (sessionId) {
        const res = await fetch(
          buildAdServerEndpoint(`/ads/checkout-session?sessionId=${sessionId}`),
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
        input = {
          ...input,
          stripePaymentId: paymentIntent,
        };
      }

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

      await updateCampaign(input);
    };

    if (props.sessionId) {
      setLoading(true);
      fetchSession(props.sessionId)
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [props.sessionId]);

  return { loading, error };
}
