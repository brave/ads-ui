import { PickerFields } from "./fields/PickerFields";
import { ConversionField } from "./fields/ConversionField";
import { CardContainer } from "components/Card/CardContainer";
import { useHistory } from "react-router-dom";
import { FormikTextField, useIsEdit } from "form/FormikHelpers";
import { AdSetAds } from "user/views/adsManager/views/advanced/components/adSet/fields/AdSetAds";
import { adSetOnOffState } from "components/EnhancedTable/renderers";
import { Stack } from "@mui/material";
import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";
import { CampaignSource } from "graphql/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Status } from "components/Campaigns/Status";
import { displayFromCampaignState } from "util/displayState";

export function AdSetFields() {
  const history = useHistory();
  const { isDraft } = useIsEdit();
  const params = new URLSearchParams(history.location.search);
  const current = Number(params.get("current") ?? 0);
  const fakeCurrent = current + 1;

  return (
    <>
      <CardContainer
        header={`Ad Set ${fakeCurrent}`}
        additionalAction={<SwitchHeader current={current} />}
      >
        <FormikTextField
          name={`adSets.${current}.name`}
          label="Ad Set Name"
          margin="none"
        />
      </CardContainer>

      <PickerFields index={current} />

      {isDraft && <ConversionField index={current} />}

      <AdSetAds index={current} />
    </>
  );
}

const SwitchHeader = (props: { current: number }) => {
  const { isEdit } = useIsEdit();
  const { advertiser } = useAdvertiser();
  const { values } = useFormikContext<CampaignForm>();
  const { current } = props;

  if (!isEdit || !values.id) {
    return null;
  }

  const c = {
    campaignState: values.state,
    campaignStart: values.startAt,
    campaignEnd: values.endAt,
    campaignId: values.id,
    campaignSource: CampaignSource.SelfServe,
    state: values.adSets[current].state,
    advertiserId: advertiser.id,
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Status state={displayFromCampaignState(c)} />
      {adSetOnOffState(c, true)}
    </Stack>
  );
};
