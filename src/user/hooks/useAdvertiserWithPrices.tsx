import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import {
  AdvertiserPriceFragment,
  useAdvertiserPricesQuery,
} from "graphql/advertiser.generated";
import { useState } from "react";
import { IAdvertiser } from "auth/context/auth.interface";
import _ from "lodash";

export type AdvertiserWithPrices = IAdvertiser & {
  prices: AdvertiserPriceFragment[];
};
export function useAdvertiserWithPrices() {
  const { advertiser } = useAdvertiser();
  const [data, setData] = useState<AdvertiserWithPrices>({
    ...advertiser,
    prices: [],
  });
  const [error, setError] = useState<string>();

  const { loading } = useAdvertiserPricesQuery({
    variables: { id: advertiser.id },
    onCompleted(data) {
      const prices = data.advertiser?.prices ?? [];
      if (_.isEmpty(prices)) {
        setError("Unable to create a new campaign");
        return;
      }

      setData({
        ...advertiser,
        prices,
      });
    },
    onError(error) {
      setError(error.message);
    },
  });

  return { data, loading, error };
}
