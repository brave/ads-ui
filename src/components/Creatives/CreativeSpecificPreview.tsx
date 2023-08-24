import { useField } from "formik";
import { Creative } from "user/views/adsManager/types";
import { CampaignFormat } from "graphql/types";
import { BoxContainer } from "components/Box/BoxContainer";
import { RemoveCreativeHeader } from "components/Creatives/RemoveCreativeHeader";
import { NotificationPreview } from "components/Creatives/NotificationPreview";
import { Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  name: string;
  useSimpleHeader?: boolean;
}

export function CreativeSpecificPreview({
  children,
  name,
  useSimpleHeader,
}: Props) {
  const [, format] = useField<CampaignFormat>("format");
  const [, meta] = useField<Creative[]>(name);

  let component;
  if (format.value === CampaignFormat.PushNotification) {
    component = meta.value.map((c, idx) => (
      <BoxContainer
        header={
          useSimpleHeader ? c.name : <RemoveCreativeHeader creative={c} />
        }
        key={idx}
      >
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
