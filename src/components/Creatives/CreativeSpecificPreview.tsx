import { CampaignFormat } from "graphql/types";
import { BoxContainer } from "components/Box/BoxContainer";
import { NotificationPreview } from "components/Creatives/NotificationPreview";
import { Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { useField } from "formik";
import { Creative } from "user/views/adsManager/types";

interface Props extends PropsWithChildren {
  options: Creative[];
  useSimpleHeader?: boolean;
}

export function CreativeSpecificPreview({
  options,
  useSimpleHeader,
  children,
}: Props) {
  const [, format] = useField<CampaignFormat>("format");

  let component;
  if (format.value === CampaignFormat.PushNotification) {
    component = options.map((c, idx) => (
      <BoxContainer header={c.name} key={idx}>
        <NotificationPreview
          title={c.payloadNotification?.title}
          body={c.payloadNotification?.body}
        />
      </BoxContainer>
    ));
  }

  return (
    <>
      {useSimpleHeader && (
        <Typography variant="overline" component="span" paddingRight={1}>
          Ads
        </Typography>
      )}
      <Stack
        direction="row"
        justifyContent="left"
        alignItems="center"
        flexWrap="wrap"
      >
        {component}
        {children}
      </Stack>
    </>
  );
}
