import { FormikTextField } from "form/FormikHelpers";
import { UrlResolver } from "components/Url/UrlResolver";
import { Stack } from "@mui/material";

export function NotificationFields() {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <FormikTextField
          name="payloadNotification.title"
          label="Title"
          maxLengthInstantFeedback={30}
        />

        <FormikTextField
          name="payloadNotification.body"
          label="Body"
          maxLengthInstantFeedback={60}
        />
      </Stack>

      <UrlResolver
        name="payloadNotification.targetUrl"
        validator="targetUrlValid"
        label="Target URL"
        helperText="Example - https://brave.com/brave-rewards/"
      />
    </>
  );
}
