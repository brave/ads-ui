import { useEffect, useState } from "react";
import { buildAdServerEndpoint } from "util/environment";
import { fetchPaymentSession } from "checkout/lib";

interface Props {
  sessionId: string | null;
  campaignId: string | null;
}

export function useValidatePaymentSession(props: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (props.sessionId && props.campaignId) {
      setLoading(true);
      fetchPaymentSession(props.sessionId, props.campaignId)
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
