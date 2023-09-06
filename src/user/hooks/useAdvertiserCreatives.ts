import { useFormikContext } from "formik";
import { CampaignForm, Creative } from "user/views/adsManager/types";
import _ from "lodash";

export function useAdvertiserCreatives() {
  const { values } = useFormikContext<CampaignForm>();
  const inAdSet: Creative[] = _.flatMap(values.adSets, "creatives").map(
    (c: Creative) => ({
      type: c.type,
      payloadNotification: c.payloadNotification,
      id: c.id,
      advertiserId: c.advertiserId,
      name: c.name,
      state: c.state,
      createdAt: c.createdAt,
      included: false,
    }),
  );

  return { creatives: _.uniqBy(inAdSet, "id") };
}
