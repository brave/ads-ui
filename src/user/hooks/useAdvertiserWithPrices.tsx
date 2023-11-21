import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import {
  AdvertiserPriceFragment,
  useAdvertiserPricesQuery,
} from "graphql/advertiser.generated";
import { useState } from "react";
import { IAdvertiser } from "auth/context/auth.interface";
import _ from "lodash";
import { BillingType } from "graphql/types";
import { Billing } from "user/views/adsManager/types";

export type AdvertiserPrice = Omit<AdvertiserPriceFragment, "billingType"> & {
  billingType: Billing;
};
export type AdvertiserWithPrices = IAdvertiser & {
  prices: AdvertiserPrice[];
};

interface Params {
  onComplete?: (data: AdvertiserWithPrices) => void;
}

export function useAdvertiserWithPrices(params: Params = {}) {
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

      // TODO: no documentation externally on what CPSV means, want that before I remove this
      const mapped: AdvertiserPrice[] = prices
        .filter((p) => p.billingType !== BillingType.Cpsv)
        .map((p) => ({
          ...p,
          billingType: p.billingType.toLowerCase() as Billing,
        }));

      const res = { ...advertiser, prices: mapped };
      setData(res);

      if (params.onComplete) {
        params.onComplete(res);
      }
    },
    onError(error) {
      setError(error.message);
    },
  });

  return { data, loading, error };
}
