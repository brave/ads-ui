import { FormikTextField } from "form/FormikHelpers";
import { UrlResolver } from "components/Url/UrlResolver";

export function NotificationFields() {
  return (
    <>
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

      <UrlResolver
        name="payloadNotification.targetUrl"
        validator="targetUrlValid"
        label="Ad Target URL"
        helperText="Example - https://brave.com/brave-rewards/"
      />
    </>
  );
}
