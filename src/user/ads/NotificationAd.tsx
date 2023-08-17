import { CardContainer } from "components/Card/CardContainer";
import { FormikTextField } from "form/FormikHelpers";
import { Stack } from "@mui/material";
import { UrlResolver } from "components/Url/UrlResolver";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { creativeInput } from "user/library";
import { CreateNotificationCreativeInput } from "graphql/types";
import { useField } from "formik";
import { Creative, initialCreative } from "user/views/adsManager/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useUser } from "auth/hooks/queries/useUser";
import {
  refetchAdvertiserCreativesQuery,
  useCreateNotificationCreativeMutation,
} from "graphql/creative.generated";
import { NotificationPreview } from "components/Creatives/NotificationPreview";

interface Props {
  onCreate: () => void;
}

export function NotificationAd({ onCreate }: Props) {
  const [, meta, newCreativeHelper] = useField<Creative>("newCreative");
  const [, creativesMeta, creativesHelper] = useField<string[]>("creatives");
  const { advertiser } = useAdvertiser();
  const { userId } = useUser();
  const [create, { loading }] = useCreateNotificationCreativeMutation({
    async onCompleted(data) {
      newCreativeHelper.setValue(initialCreative);
      newCreativeHelper.setTouched(false);
      creativesHelper.setValue([
        ...(creativesMeta.value ?? []),
        data.createNotificationCreative.id,
      ]);
      onCreate();
    },
    refetchQueries: [
      {
        ...refetchAdvertiserCreativesQuery({ advertiserId: advertiser.id }),
      },
    ],
  });

  return (
    <CardContainer header="New Ad">
      <FormikTextField name="newCreative.name" label="Ad Name" />

      <Stack direction="row" alignItems="center" spacing={1}>
        <FormikTextField
          name="newCreative.title"
          label="Ad Title"
          helperText="Max 30 Characters"
          maxLengthInstantFeedback={30}
        />

        <FormikTextField
          name="newCreative.body"
          label="Ad Body"
          helperText="Max 60 Characters"
          maxLengthInstantFeedback={60}
        />
      </Stack>

      <NotificationPreview />

      <UrlResolver
        name="newCreative.targetUrl"
        validator="newCreative.targetUrlValidationResult"
        label="Ad Target URL"
        helperText="Example - https://brave.com/brave-rewards/"
      />

      <Stack direction="row" justifyContent="space-between" mt={1}>
        <div />
        <LoadingButton
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={(e) => {
            e.preventDefault();
            const input = creativeInput(
              advertiser.id,
              meta.value,
              userId,
            ) as CreateNotificationCreativeInput;
            create({ variables: { input } });
          }}
          disabled={
            !!meta.error ||
            meta.value?.targetUrlValidationResult !== undefined ||
            loading
          }
          loading={loading}
        >
          Add
        </LoadingButton>
      </Stack>
    </CardContainer>
  );
}
