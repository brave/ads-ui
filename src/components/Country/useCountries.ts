import { buildAdServerV2Endpoint } from "util/environment";
import { useEffect, useState } from "react";

export function useCountries() {
  const [data, setData] = useState<{ name: string; code: string }[]>([]);

  useEffect(() => {
    fetchCountries().then((data) => {
      setData(data);
    });
  }, []);

  return { data };
}

const fetchCountries = async () => {
  const res = await fetch(buildAdServerV2Endpoint("/geocode/countries"), {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });

  return await res.json();
};
