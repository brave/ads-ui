import { CardContainer } from "@/components/Card/CardContainer";
import { FormikTextField } from "@/form/FormikHelpers";
import { Box, Stack, Typography } from "@mui/material";
import { UrlResolver } from "@/components/Url/UrlResolver";
import { useField } from "formik";
import { NotificationPreview } from "@/components/Creatives/NotificationPreview";
import { CreateCreativeButton } from "@/components/Creatives/CreateCreativeButton";
import { useEffect } from "react";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";

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
  }, []);

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
  const { _ } = useLingui();

  return (
    <>
      <Typography variant="h2" fontWeight={500}>
        <Trans>Notification ad</Trans>
      </Typography>

      <FormikTextField name={withName("name")} label={_(msg`Name`)} />

      <FormikTextField
        name={withName("payloadNotification.title")}
        label={_(msg`Title`)}
        helperText={_(msg`Max 30 Characters`)}
        maxLengthInstantFeedback={30}
      />

      <FormikTextField
        name={withName("payloadNotification.body")}
        label={_(msg`Body`)}
        helperText={_(msg`Max 60 Characters`)}
        maxLengthInstantFeedback={60}
      />

      <Typography
        variant="caption"
        textAlign="center"
        display="block"
        fontWeight={500}
      >
        <Trans>
          Make sure to include your brand name in the title OR body of the ad.
          Otherwise, it will be rejected.
        </Trans>
      </Typography>

      <NotificationPreview />

      <UrlResolver
        name={withName("payloadNotification.targetUrl")}
        validator={withName("targetUrlValid")}
        label={_(msg`Target URL`)}
        helperText={_(msg`Example - https://brave.com/brave-rewards/`)}
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
