import SaveIcon from "@mui/icons-material/Save";
import { Creative, initialCreative } from "user/views/adsManager/types";
import _ from "lodash";
import {
  refetchAdvertiserCreativesQuery,
  useCreateCreativeMutation,
} from "graphql/creative.generated";
import { useField } from "formik";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { LoadingButton } from "@mui/lab";
import { transformCreativeFragment } from "user/library";

export function CreateCreativeButton() {
  const [, , isCreating] = useField<boolean>("isCreating");
  const [, newMeta, newHelper] = useField<Creative>("newCreative");
  const [, creativesMeta, creativesHelper] = useField<Creative[]>("creatives");
  const { advertiser } = useAdvertiser();

  const [create, { loading }] = useCreateCreativeMutation({
    async onCompleted(data) {
      newHelper.setValue(initialCreative);
      newHelper.setTouched(false);
      creativesHelper.setValue([
        ...(creativesMeta.value ?? []),
        transformCreativeFragment(data.createCreative, advertiser.id),
      ]);
      isCreating.setValue(false);
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
        create({
          variables: {
            input: { ...newMeta.value, advertiserId: advertiser.id },
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
      Add
    </LoadingButton>
  );
}
