import SaveIcon from "@mui/icons-material/Save";
import {
  CampaignForm,
  Creative,
  initialCreative,
} from "user/views/adsManager/types";
import _ from "lodash";
import {
  refetchAdvertiserCreativesQuery,
  useCreateCreativeMutation,
} from "graphql/creative.generated";
import { useField, useFormikContext } from "formik";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { LoadingButton } from "@mui/lab";
import { validCreativeFields } from "user/library";

export function CreateCreativeButton() {
  const { values, setFieldValue } = useFormikContext<CampaignForm>();
  const [, , isCreating] = useField<boolean>("isCreating");
  const [, newMeta, newHelper] = useField<Creative>("newCreative");
  const { advertiser } = useAdvertiser();

  const [create, { loading }] = useCreateCreativeMutation({
    async onCompleted(data) {
      void newHelper.setValue(initialCreative);
      void newHelper.setTouched(false);
      values.adSets.forEach((adSet, idx) => {
        void setFieldValue(`adSets.${idx}.creatives`, [
          ...adSet.creatives,
          validCreativeFields(data.createCreative, advertiser.id, true),
        ]);
      });
      void isCreating.setValue(false);
    },
    refetchQueries: [
      {
        ...refetchAdvertiserCreativesQuery({ advertiserId: advertiser.id }),
      },
    ],
  });

  return (
    <LoadingButton
      variant="contained"
      startIcon={<SaveIcon />}
      onClick={(e) => {
        e.preventDefault();
        void create({
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
      Save ad
    </LoadingButton>
  );
}
