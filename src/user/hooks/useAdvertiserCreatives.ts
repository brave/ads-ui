import { useFormikContext } from "formik";
import { CampaignForm, Creative } from "@/user/views/adsManager/types";
import _ from "lodash";
import { isCreativeTypeApplicableToCampaignFormat } from "@/user/library";

export function useAdvertiserCreatives() {
  const { values } = useFormikContext<CampaignForm>();
  const inAdSet: Creative[] = _.flatMap(values.adSets, "creatives")
    .map((c: Creative) => ({
      type: c.type,
      payloadNotification: c.payloadNotification,
      payloadInlineContent: c.payloadInlineContent,
      id: c.id,
      advertiserId: c.advertiserId,
      name: c.name,
      state: c.state,
      createdAt: c.createdAt,
      included: false,
    }))
    .filter((c) =>
      isCreativeTypeApplicableToCampaignFormat(c.type, values.format),
    );

  return { creatives: _.uniqBy(inAdSet, "id") };
}
