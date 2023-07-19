import { useEffect, useState } from "react";
import { fetchPaymentSession } from "checkout/lib";

interface Props {
  sessionId: string | null;
  campaignId: string | null;
}

export function useValidatePaymentSession(props: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (props.campaignId) {
      setLoading(true);
      fetchPaymentSession(props.campaignId, props.sessionId)
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
