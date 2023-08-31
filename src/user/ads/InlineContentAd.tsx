import { FormikTextField } from "form/FormikHelpers";
import { UrlResolver } from "components/Url/UrlResolver";
import { useField } from "formik";
import { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { CreateCreativeButton } from "components/Creatives/CreateCreativeButton";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { CardContainer } from "components/Card/CardContainer";
import { ImageAutocomplete } from "components/Assets/ImageAutocomplete";
import { NewsPreview } from "components/Creatives/NewsPreview";

export function InlineContentAd() {
  const { advertiser } = useAdvertiser();
  const [, , code] = useField<string>("newCreative.type.code");
  const [, , description] = useField<string>(
    "newCreative.payloadInlineContent.description",
  );
  useEffect(() => {
    code.setValue("inline_content_all_v1");
    description.setValue(advertiser.name);
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <CardContainer header="Create News Ad" sx={{ flexGrow: 1 }}>
        <FormikTextField name="newCreative.name" label="Name" />

        <FormikTextField
          name="newCreative.payloadInlineContent.title"
          label="Title"
          maxLengthInstantFeedback={90}
        />

        <FormikTextField
          name="newCreative.payloadInlineContent.ctaText"
          label="Call to Action text"
          maxLengthInstantFeedback={15}
        />

        <ImageAutocomplete />

        <UrlResolver
          validator="newCreative.targetUrlValid"
          name="newCreative.payloadInlineContent.targetUrl"
          label="Target URL"
        />

        <Stack direction="row" justifyContent="space-between" mt={1}>
          <div />
          <CreateCreativeButton />
        </Stack>
      </CardContainer>
      <NewsPreview />
    </Box>
  );
}
