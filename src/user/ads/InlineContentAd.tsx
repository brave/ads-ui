import { FormikTextField } from "@/form/FormikHelpers";
import { UrlResolver } from "@/components/Url/UrlResolver";
import { useField } from "formik";
import { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { CreateCreativeButton } from "@/components/Creatives/CreateCreativeButton";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { CardContainer } from "@/components/Card/CardContainer";
import { ImageAutocomplete } from "@/components/Assets/ImageAutocomplete";
import { NewsPreview } from "@/components/Creatives/NewsPreview";
import { useLingui } from "@lingui/react";
import { msg, Trans } from "@lingui/macro";

interface InlineAdProps {
  name?: string;
  useContainer?: boolean;
  alignPreview?: "column" | "row";
  index?: number;
}

export function InlineContentAd(props: InlineAdProps) {
  const { advertiser } = useAdvertiser();
  const withName = (s: string) => (props.name ? `${props.name}.${s}` : s);
  const [, , code] = useField<string>(withName("type.code"));
  const [, , description] = useField<string>(
    withName("payloadInlineContent.description"),
  );
  useEffect(() => {
    code.setValue("inline_content_all_v1");
    description.setValue(advertiser.name);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection={props.alignPreview ?? "column"}
      gap={2}
      alignItems="center"
    >
      {props.useContainer !== false ? (
        <CardContainer sx={{ flexGrow: 1, flexShrink: 0 }}>
          <InlineAdForm {...props} />
        </CardContainer>
      ) : (
        <Box minWidth={750}>
          <InlineAdForm {...props} />
        </Box>
      )}
      <NewsPreview />
    </Box>
  );
}

const InlineAdForm = (props: InlineAdProps) => {
  const { _ } = useLingui();
  const { advertiser } = useAdvertiser();
  const withName = (s: string) => (props.name ? `${props.name}.${s}` : s);

  return (
    <>
      <Typography variant="h2">
        <Trans>Newsfeed Ad</Trans>
      </Typography>

      <FormikTextField name={withName("name")} label={_(msg`Name`)} />

      <FormikTextField
        name={withName("payloadInlineContent.title")}
        label={_(msg`Title`)}
        maxLengthInstantFeedback={90}
      />

      <FormikTextField
        name={withName("payloadInlineContent.ctaText")}
        label={_(msg`Call to Action text`)}
        maxLengthInstantFeedback={15}
      />

      <ImageAutocomplete name={withName("payloadInlineContent.imageUrl")} />

      <UrlResolver
        validator={withName("targetUrlValid")}
        name={withName("payloadInlineContent.targetUrl")}
        label={_(msg`Target URL`)}
      />

      {advertiser.selfServiceSetPrice && (
        <FormikTextField
          name={withName("payloadInlineContent.description")}
          label={_(msg`Advertiser Name`)}
        />
      )}

      {props.index !== undefined && (
        <Stack direction="row" justifyContent="space-between" mt={1}>
          <div />
          <CreateCreativeButton index={props.index} />
        </Stack>
      )}
    </>
  );
};
