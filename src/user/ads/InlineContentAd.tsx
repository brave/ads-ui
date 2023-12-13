import { FormikTextField } from "form/FormikHelpers";
import { UrlResolver } from "components/Url/UrlResolver";
import { useField } from "formik";
import { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { CreateCreativeButton } from "components/Creatives/CreateCreativeButton";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { CardContainer } from "components/Card/CardContainer";
import { ImageAutocomplete } from "components/Assets/ImageAutocomplete";
import { NewsPreview } from "components/Creatives/NewsPreview";

interface InlineAdProps {
  name?: string;
  useCustomButton?: boolean;
  useContainer?: boolean;
  alignPreview?: "column" | "row";
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
        <CardContainer sx={{ flexGrow: 1, maxWidth: "950px" }}>
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
  const { advertiser } = useAdvertiser();
  const withName = (s: string) => (props.name ? `${props.name}.${s}` : s);

  return (
    <>
      <Typography variant="h2">News Display Ad</Typography>

      <FormikTextField name={withName("name")} label="Name" />

      <FormikTextField
        name={withName("payloadInlineContent.title")}
        label="Title"
        maxLengthInstantFeedback={90}
      />

      <FormikTextField
        name={withName("payloadInlineContent.ctaText")}
        label="Call to Action text"
        maxLengthInstantFeedback={15}
      />

      <ImageAutocomplete name={withName("payloadInlineContent.imageUrl")} />

      <UrlResolver
        validator={withName("targetUrlValid")}
        name={withName("payloadInlineContent.targetUrl")}
        label="Target URL"
      />

      {advertiser.selfServiceSetPrice && (
        <FormikTextField
          name={withName("payloadInlineContent.description")}
          label="Advertiser Name"
        />
      )}

      {props.useCustomButton !== true && (
        <Stack direction="row" justifyContent="space-between" mt={1}>
          <div />
          <CreateCreativeButton />
        </Stack>
      )}
    </>
  );
};
