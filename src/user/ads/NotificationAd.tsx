import { CardContainer } from "components/Card/CardContainer";
import { FormikTextField } from "form/FormikHelpers";
import { Stack } from "@mui/material";
import { UrlResolver } from "components/Url/UrlResolver";
import { useField } from "formik";
import { NotificationPreview } from "components/Creatives/NotificationPreview";
import { CreateCreativeButton } from "components/Creatives/CreateCreativeButton";
import { useEffect } from "react";

export function NotificationAd(props: {
  name?: string;
  useCustomButton?: boolean;
}) {
  const withName = (s: string) => (props.name ? `${props.name}.${s}` : s);
  const [, , code] = useField<string>(withName("type.code"));

  useEffect(() => {
    code.setValue("notification_all_v1");
  }, []);

  return (
    <CardContainer header="Create Notification Ad">
      <FormikTextField name={withName("name")} label="Name" />

      <Stack direction="row" alignItems="center" spacing={1}>
        <FormikTextField
          name={withName("payloadNotification.title")}
          label="Title"
          helperText="Max 30 Characters"
          maxLengthInstantFeedback={30}
        />

        <FormikTextField
          name={withName("payloadNotification.body")}
          label="Body"
          helperText="Max 60 Characters"
          maxLengthInstantFeedback={60}
        />
      </Stack>

      <NotificationPreview />

      <UrlResolver
        name={withName("payloadNotification.targetUrl")}
        validator={withName("targetUrlValid")}
        label="Target URL"
        helperText="Example - https://brave.com/brave-rewards/"
      />

      {props.useCustomButton !== true && (
        <Stack direction="row" justifyContent="space-between" mt={1}>
          <div />
          <CreateCreativeButton />
        </Stack>
      )}
    </CardContainer>
  );
}
