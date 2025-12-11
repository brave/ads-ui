import { CardContainer } from "@/components/Card/CardContainer";
import { FormikTextField } from "@/form/FormikHelpers";
import { Box, Stack, Typography } from "@mui/material";
import { UrlResolver } from "@/components/Url/UrlResolver";
import { useField } from "formik";
import { NotificationPreview } from "@/components/Creatives/NotificationPreview";
import { CreateCreativeButton } from "@/components/Creatives/CreateCreativeButton";
import { useEffect } from "react";

interface NotificationAdProps {
  name?: string;
  useContainer?: boolean;
  index?: number;
}

export function NotificationAd(props: NotificationAdProps) {
  const withName = (s: string) => (props.name ? `${props.name}.${s}` : s);
  const [, , code] = useField<string>(withName("type.code"));

  useEffect(() => {
    code.setValue("notification_all_v1");
  }, [code]);

  if (props.useContainer === false) {
    return (
      <Box minWidth={700}>
        <NotificationAdForm {...props} />
      </Box>
    );
  }

  return (
    <CardContainer>
      <NotificationAdForm {...props} />
    </CardContainer>
  );
}

const NotificationAdForm = (props: NotificationAdProps) => {
  const withName = (s: string) => (props.name ? `${props.name}.${s}` : s);

  return (
    <>
      <Typography variant="h2" fontWeight={500}>
        Notification ad
      </Typography>

      <FormikTextField name={withName("name")} label={"Name"} />

      <FormikTextField
        name={withName("payloadNotification.title")}
        label={"Title"}
        helperText={"Max 30 Characters"}
        maxLengthInstantFeedback={30}
      />

      <FormikTextField
        name={withName("payloadNotification.body")}
        label={"Body"}
        helperText={"Max 60 Characters"}
        maxLengthInstantFeedback={60}
      />

      <Typography
        variant="caption"
        textAlign="center"
        display="block"
        fontWeight={500}
      >
        Make sure to include your brand name in the title OR body of the ad.
        Otherwise, it will be rejected.
      </Typography>

      <NotificationPreview />

      <UrlResolver
        name={withName("payloadNotification.targetUrl")}
        validator={withName("targetUrlValid")}
        label={"Target URL"}
        helperText={"Example - https://brave.com/brave-rewards/"}
      />

      {props.index !== undefined && (
        <Stack direction="row" justifyContent="space-between" mt={1}>
          <div />
          <CreateCreativeButton index={props.index} />
        </Stack>
      )}
    </>
  );
};
