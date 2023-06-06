import { buildAdServerV2Endpoint } from "util/environment";
import { useEffect, useState } from "react";
import _ from "lodash";

export function useCountries() {
  const [data, setData] = useState<{ name: string; code: string }[]>([]);

  useEffect(() => {
    fetch(buildAdServerV2Endpoint("/geocode"), {
      method: "GET",
      mode: "cors",
      credentials: "include",
    })
      .then(async (res) => {
        return await res.json();
      })
      .then((data) => {
        const sorted = _.sortBy(data ?? [], "name");
        setData(sorted.filter((e) => e.code.length === 2));
      });
  }, []);

  return { data };
}
