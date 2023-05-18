import { useEffect, useState } from "react";
import { buildAdServerEndpoint } from "util/environment";
import { updateCampaign } from "user/library";

interface Props {
  sessionId: string | null;
  campaignId: string;
  advertiserId: string;
}

interface Payment {
  intent: string;
}

export function useValidateSession(props: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<Payment>();

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
      await updateCampaign({
        id: props.campaignId,
        state: "under_review",
        stripePaymentId: paymentIntent,
        advertiserId: props.advertiserId,
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
