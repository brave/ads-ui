import { CardContainer } from "components/Card/CardContainer";
import { FormikTextField } from "form/FormikHelpers";
import { Stack } from "@mui/material";
import { UrlResolver } from "components/Url/UrlResolver";
import { useField } from "formik";
import { NotificationPreview } from "components/Creatives/NotificationPreview";
import { CreateCreativeButton } from "components/Creatives/CreateCreativeButton";
import { useEffect } from "react";

export function NotificationAd() {
  const [, , code] = useField<string>("newCreative.type.code");

  useEffect(() => {
    code.setValue("notification_all_v1");
  }, []);

  return (
    <CardContainer header="Create Notification Ad">
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
        <CreateCreativeButton />
      </Stack>
    </CardContainer>
  );
}
