import { Typography, Divider } from "@mui/material";
import { useFormikContext } from "formik";
import { CampaignFormat } from "graphql/types";
import _ from "lodash";
import {
  CreativeFragment,
  useAdvertiserCreativesQuery,
} from "graphql/creative.generated";
import { isCreativeTypeApplicableToCampaignFormat } from "user/library";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { CampaignForm } from "user/views/adsManager/types";
import { CreativeAutocomplete } from "components/Creatives/CreativeAutocomplete";
import { CardContainer } from "components/Card/CardContainer";

function filterCreativesBasedOnCampaignFormat(
  creatives: CreativeFragment[],
  campaignFormat: CampaignFormat | null,
): CreativeFragment[] {
  if (!campaignFormat) return creatives;

  return creatives.filter((c) =>
    isCreativeTypeApplicableToCampaignFormat(c.type, campaignFormat),
  );
}

export function AdsNewAd(props: { onAddCreative: () => void }) {
  const { values } = useFormikContext<CampaignForm>();
  const { advertiser } = useAdvertiser();
  const { data } = useAdvertiserCreativesQuery({
    variables: { advertiserId: advertiser.id },
  });

  const allCreativesForAdvertiser = data?.advertiser?.creatives ?? [];
  const associatedCreatives = values.creatives ?? [];
  const creativeOptionList = _.orderBy(
    filterCreativesBasedOnCampaignFormat(
      allCreativesForAdvertiser,
      values.format,
    ),
    ["type.code", "createdAt"],
    ["asc", "desc"],
  ) as CreativeFragment[];

  return (
    <CardContainer header="Existing creative">
      <Typography variant="h1">Add an existing creative</Typography>

      <Divider sx={{ mt: 2, mb: 2 }} />

      <Typography variant="subtitle2">
        Creatives are modular building blocks that can be paired with ad sets to
        build ads.
      </Typography>

      <CreativeAutocomplete
        label="Creative"
        options={creativeOptionList}
        alreadyAssociatedCreativeIds={associatedCreatives}
        onSetValue={() => {
          props.onAddCreative();
        }}
      />
    </CardContainer>
  );
}
