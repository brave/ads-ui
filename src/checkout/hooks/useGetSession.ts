import { useEffect, useState } from "react";
import { buildAdServerEndpoint } from "util/environment";

interface Props {
  id: string | null;
}

interface Payment {
  intent: string;
}

export function useGetSessionById(props: Props) {
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
      return { paymentIntent };
    };

    setLoading(true);
    if (props.id) {
      fetchSession(props.id)
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
  }, [props.id]);

  return { data, loading, error };
}
