import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import {
  AdvertiserCreativesDocument,
  CreateCreativeDocument,
} from "@/graphql-client/graphql";
import { validCreativeFields } from "@/user/library";
import {
  CampaignForm,
  Creative,
  initialCreative,
} from "@/user/views/adsManager/types";
import { useMutation } from "@apollo/client";
import SaveIcon from "@mui/icons-material/Save";
import { Button } from "@mui/material";
import { useField, useFormikContext } from "formik";
import _ from "lodash";

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

  const creative = validCreativeFields(
    { ...newMeta.value, id: "" },
    advertiser.id,
  );

  return (
    <Button
      variant="contained"
      startIcon={<SaveIcon />}
      onClick={(e) => {
        e.preventDefault();
        create({
          variables: {
            input: {
              advertiserId: advertiser.id,
              name: creative.name,
              state: "under_review",
              payloadNotification: creative.payloadNotification,
              payloadInlineContent: creative.payloadInlineContent,
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
    </Button>
  );
}
