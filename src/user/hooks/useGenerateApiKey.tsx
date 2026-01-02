import { buildAdServerV2Endpoint } from "@/util/environment";
import { useCallback, useState } from "react";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";

export function useGenerateApiKey() {
  const { trackMatomoEvent } = useTrackMatomoEvent();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string>();
  const [error, setError] = useState<string>();

  const generate = useCallback(
    (advertiserId: string) => {
      setLoading(true);
      trackMatomoEvent("user", "generate-api-key");
      createKey(advertiserId)
        .then((res) => {
          setData(res);
        })
        .catch((error) => {
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [trackMatomoEvent],
  );

  return { generate, data, loading, error };
}

async function createKey(advertiserId: string): Promise<string> {
  const res = await fetch(buildAdServerV2Endpoint("/auth/api-key"), {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      advertiserId,
    }),
  });

  if (res.status !== 200) {
    throw new Error("cannot create api key");
  }

  const { apiKey } = await res.json();
  return apiKey;
}
