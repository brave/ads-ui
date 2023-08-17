import { useFormikContext } from "formik";
import { CreativeInput } from "graphql/types";
import { NotificationPreview } from "components/Creatives/NotificationPreview";

export const CreativeTypePreview = () => {
  const { values } = useFormikContext<CreativeInput>();

  if (values.type.code === "notification_all_v1") {
    return (
      <NotificationPreview
        title={values.payloadNotification?.title}
        body={values.payloadNotification?.body}
      />
    );
  }

  return null;
};
