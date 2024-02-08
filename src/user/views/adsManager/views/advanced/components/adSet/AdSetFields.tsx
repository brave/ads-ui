import { PickerFields } from "./fields/PickerFields";
import { ConversionField } from "./fields/ConversionField";
import { CardContainer } from "components/Card/CardContainer";
import { useHistory } from "react-router-dom";
import { FormikTextField, useIsEdit } from "form/FormikHelpers";
import { AdSetAds } from "user/views/adsManager/views/advanced/components/adSet/fields/AdSetAds";
import { adSetOnOffState } from "components/Datagrid/renderers";
import { Stack, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";
import { CampaignSource } from "graphql/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Status } from "components/Campaigns/Status";
import { displayFromCampaignState } from "util/displayState";
import { LearnMoreButton } from "components/Button/LearnMoreButton";
import { useTrackMatomoPageView } from "hooks/useTrackWithMatomo";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export function AdSetFields() {
  const { _ } = useLingui();
  const history = useHistory();
  const { isDraft } = useIsEdit();
  const params = new URLSearchParams(history.location.search);
  const current = Number(params.get("current") ?? 0);
  const fakeCurrent = current + 1;
  useTrackMatomoPageView({ documentTitle: `Ad set ${current} settings` });

  return (
    <>
      <CardContainer
        header={`${_(msg`Ad Set`)} ${fakeCurrent}`}
        additionalAction={<SwitchHeader current={current} />}
      >
        <Typography variant="body2" gutterBottom>
          <Trans>Name your ad set to distinguish it from others.</Trans>{" "}
          <LearnMoreButton helpSection="getting-started/create-an-ad-set" />
        </Typography>
        <FormikTextField
          name={`adSets.${current}.name`}
          label={_(msg`Ad set name`)}
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
