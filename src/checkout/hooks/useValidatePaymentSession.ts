import { useEffect, useState } from "react";
import { buildAdServerEndpoint } from "util/environment";

interface Props {
  sessionId: string | null;
  campaignId: string | null;
}

export function useValidatePaymentSession(props: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchSession = async (session: string, campaign: string) => {
      const res = await fetch(
        buildAdServerEndpoint(
          `/ads/checkout-session?sessionId=${session}&referenceId=${campaign}`
        ),
        {
          method: "PUT",
          mode: "cors",
          credentials: "include",
        }
      );

      if (res.status !== 200) {
        throw new Error("invalid session");
      }
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
