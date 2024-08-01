import SaveIcon from "@mui/icons-material/Save";
import {
  CampaignForm,
  Creative,
  initialCreative,
} from "@/user/views/adsManager/types";
import _ from "lodash";
import { useField, useFormikContext } from "formik";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { LoadingButton } from "@mui/lab";
import { validCreativeFields } from "@/user/library";
import { Trans } from "@lingui/macro";
import { useMutation } from "@apollo/client";
import {
  AdvertiserCreativesDocument,
  CreateCreativeDocument,
} from "@/graphql-client/graphql";

interface Props {
  index: number;
}

export function CreateCreativeButton({ index }: Props) {
  const { values, setFieldValue } = useFormikContext<CampaignForm>();
  const [, , isCreating] = useField<boolean>("isCreating");
  const [, newMeta, newHelper] = useField<Creative>("newCreative");
  const { advertiser } = useAdvertiser();

  const [create, { loading }] = useMutation(CreateCreativeDocument, {
    async onCompleted(data) {
      newHelper.setValue(initialCreative);
      newHelper.setTouched(false);
      values.adSets.forEach((adSet, idx) => {
        void setFieldValue(`adSets.${idx}.creatives`, [
          ...adSet.creatives,
          validCreativeFields(
            data.createCreative,
            advertiser.id,
            idx === index,
          ),
        ]);
      });
      isCreating.setValue(false);
    },
    refetchQueries: [
      {
        query: AdvertiserCreativesDocument,
        variables: { advertiserId: advertiser.id },
      },
    ],
  });

  return (
    <LoadingButton
      variant="contained"
      startIcon={<SaveIcon />}
      onClick={(e) => {
        e.preventDefault();
        create({
          variables: {
            input: {
              ..._.omit(newMeta.value, "included"),
              advertiserId: advertiser.id,
            },
          },
        });
      }}
      disabled={
        newMeta.value?.targetUrlValid !== undefined ||
        !_.isEmpty(newMeta.error) ||
        loading
      }
      loading={loading}
    >
      <Trans>Save ad</Trans>
    </LoadingButton>
  );
}
