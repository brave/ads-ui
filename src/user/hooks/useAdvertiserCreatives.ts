import {
  CreativeFragment,
  useAdvertiserCreativesQuery,
} from "graphql/creative.generated";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";
import _ from "lodash";
import moment from "moment";

export function useAdvertiserCreatives(): CreativeFragment[] {
  const { advertiser } = useAdvertiser();
  const { data } = useAdvertiserCreativesQuery({
    variables: { advertiserId: advertiser.id },
  });

  return (data?.advertiser?.creatives ?? []).map((c) => ({
    ...c,
    advertiserId: advertiser.id,
  }));
}

export function useRecentlyCreatedAdvertiserCreatives() {
  const { values } = useFormikContext<CampaignForm>();
  const creatives = useAdvertiserCreatives();
  const inCampaign = creatives.filter((c) => {
    if (c.id) {
      return (
        (_.flatMap(values.adSets, "creatives") ?? []).find(
          (i) => i.id === c.id,
        ) !== undefined
      );
    }

    return false;
  });

  return _.uniqBy(inCampaign, "id");
}

export function useFreshCreatives() {
  const { values } = useFormikContext<CampaignForm>();
  return (values.creatives ?? []).filter((c) => !c.id);
}

export function useRecentlyCreatedAdSetAds() {
  const { values } = useFormikContext<CampaignForm>();
  const creatives = useAdvertiserCreatives();
  const brandNew = (values.creatives ?? [])
    .filter((c) => !c.id)
    .map((c) => ({
      ...c,
      createdAt: moment(),
      modifiedAt: moment(),
    })) as CreativeFragment[];

  const inAdSet = creatives.filter((c) => {
    if (c.id) {
      return (values.creatives ?? []).find((i) => i.id === c.id) !== undefined;
    }

    return false;
  });

  return [..._.uniqBy(inAdSet, "id"), ...brandNew];
}
