import { FormikTextField } from "form/FormikHelpers";
import { UrlResolver } from "components/Url/UrlResolver";
import { useField } from "formik";
import { useEffect } from "react";
import { Stack } from "@mui/material";
import { CreateCreativeButton } from "components/Creatives/CreateCreativeButton";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { CardContainer } from "components/Card/CardContainer";
import { ImageAutocomplete } from "components/Assets/ImageAutocomplete";
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
    <CardContainer header="Create News Ad">
      <FormikTextField
        name="newCreative.payloadInlineContent.title"
        label="Title"
        maxLengthInstantFeedback={90}
      />
      <UrlResolver
        validator="newCreative.targetUrlValid"
        name="newCreative.payloadInlineContent.targetUrl"
        label="Target URL"
      />
      <FormikTextField
        name="newCreative.payloadInlineContent.ctaText"
        label="Call to Action text"
        maxLengthInstantFeedback={15}
      />

      <ImageAutocomplete />

      <Stack direction="row" justifyContent="space-between" mt={1}>
        <div />
        <CreateCreativeButton />
      </Stack>
    </CardContainer>
  );
}
