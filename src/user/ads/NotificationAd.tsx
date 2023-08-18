import { CardContainer } from "components/Card/CardContainer";
import { FormikTextField } from "form/FormikHelpers";
import { Button, Stack } from "@mui/material";
import { UrlResolver } from "components/Url/UrlResolver";
import SaveIcon from "@mui/icons-material/Save";
import { useField } from "formik";
import { Creative, initialCreative } from "user/views/adsManager/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { NotificationPreview } from "components/Creatives/NotificationPreview";
import _ from "lodash";
import { useEffect } from "react";

interface Props {
  onCreate: () => void;
}

export function NotificationAd({ onCreate }: Props) {
  const [, newMeta, newHelper] = useField<Creative>("newCreative");
  const [, creativesMeta, creativesHelper] = useField<Creative[]>("creatives");
  const { advertiser } = useAdvertiser();

  useEffect(() => {
    newHelper.setValue({
      ...newMeta.value,
      advertiserId: advertiser.id,
      state: "draft",
      type: { code: "notification_all_v1" },
    });
  }, []);

  return (
    <CardContainer header="New Ad">
      <FormikTextField name="newCreative.name" label="Ad Name" />

      <Stack direction="row" alignItems="center" spacing={1}>
        <FormikTextField
          name="newCreative.payloadNotification.title"
          label="Ad Title"
          helperText="Max 30 Characters"
          maxLengthInstantFeedback={30}
        />

        <FormikTextField
          name="newCreative.payloadNotification.body"
          label="Ad Body"
          helperText="Max 60 Characters"
          maxLengthInstantFeedback={60}
        />
      </Stack>

      <NotificationPreview />

      <UrlResolver
        name="newCreative.payloadNotification.targetUrl"
        validator="newCreative.targetUrlValid"
        label="Ad Target URL"
        helperText="Example - https://brave.com/brave-rewards/"
      />

      <Stack direction="row" justifyContent="space-between" mt={1}>
        <div />
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={(e) => {
            e.preventDefault();
            creativesHelper.setValue([...creativesMeta.value, newMeta.value]);
            newHelper.setValue(initialCreative);
            newHelper.setTouched(false, false);
            onCreate();
          }}
          disabled={
            !_.isEmpty(newMeta.error) ||
            newMeta.value?.targetUrlValid !== undefined
          }
        >
          Add
        </Button>
      </Stack>
    </CardContainer>
  );
}
