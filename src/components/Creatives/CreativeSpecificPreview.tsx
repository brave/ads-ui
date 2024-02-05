import { CampaignFormat } from "graphql/types";
import { BoxContainer } from "components/Box/BoxContainer";
import { NotificationPreview } from "components/Creatives/NotificationPreview";
import { Stack, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { useField } from "formik";
import { Creative } from "user/views/adsManager/types";
import { DisplayError } from "user/views/adsManager/views/advanced/components/review/components/ReviewField";
import { ImagePreview } from "components/Assets/ImagePreview";
import { Trans } from "@lingui/macro";

interface Props extends PropsWithChildren {
  options: Creative[];
  useSimpleHeader?: boolean;
  error?: string;
}

export function CreativeSpecificPreview({
  options,
  useSimpleHeader,
  error,
  children,
}: Props) {
  const [, format] = useField<CampaignFormat>("format");

  let component;
  if (format.value === CampaignFormat.PushNotification) {
    component = options.map((c, idx) => (
      <BoxContainer header={c.name} key={idx} useTypography>
        <NotificationPreview
          title={c.payloadNotification?.title}
          body={c.payloadNotification?.body}
        />
      </BoxContainer>
    ));
  } else if (format.value === CampaignFormat.NewsDisplayAd) {
    component = options.map((c, idx) => (
      <BoxContainer header={c.name} useTypography key={idx}>
        <ImagePreview
          url={c.payloadInlineContent?.imageUrl ?? ""}
          width={300}
          height={200}
        />
      </BoxContainer>
    ));
  }

  if (error) {
    return (
      <>
        <Typography variant="overline" component="span" paddingRight={1}>
          <Trans>Ads</Trans>
        </Typography>
        <DisplayError error={error} />
      </>
    );
  }

  return (
    <>
      {useSimpleHeader && (
        <Typography variant="overline" component="span" paddingRight={1}>
          <Trans>Ads</Trans>
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
