import { useAdvertiserCreativesQuery } from "graphql/creative.generated";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useFormikContext } from "formik";
import { CampaignForm, Creative } from "user/views/adsManager/types";
import _ from "lodash";

export function useAdvertiserCreatives(): Creative[] {
  const { advertiser } = useAdvertiser();
  const { data } = useAdvertiserCreativesQuery({
    variables: { advertiserId: advertiser.id },
  });

  return (data?.advertiser?.creatives ?? []).map((c) => ({
    id: c.id,
    name: c.name,
    title: c.payloadNotification?.title ?? "New Ad",
    body: c.payloadNotification?.body ?? "Body Preview",
    targetUrl: c.payloadNotification?.targetUrl ?? "",
    state: c.state,
  }));
}

export function useRecentlyCreatedAdvertiserCreatives() {
  const { values } = useFormikContext<CampaignForm>();
  const creatives = useAdvertiserCreatives();
  const inCampaign = creatives.filter((c) => {
    if (c.id) {
      return (values.creatives ?? []).includes(c.id);
    }

    return false;
  });

  return _.uniqBy(inCampaign, "id");
}
