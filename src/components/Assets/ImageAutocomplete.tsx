import { useAdvertiserImagesQuery } from "graphql/advertiser.generated";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useField } from "formik";

export function ImageAutocomplete() {
  const [, meta, imageUrl] = useField(
    `newCreative.payloadInlineContent.imageUrl`,
  );
  const hasError = Boolean(meta.error);
  const showError = hasError && meta.touched;
  const { advertiser } = useAdvertiser();
  const [options, setOptions] = useState<{ label: string; image: string }[]>();
  const { loading } = useAdvertiserImagesQuery({
    variables: { id: advertiser.id },
    onCompleted(data) {
      const images = data.advertiser?.images ?? [];
      const options = images.map((i) => ({
        label: i.name,
        image: i.imageUrl,
      }));

      setOptions(options);
    },
  });

  return (
    <Autocomplete
      disablePortal
      loading={!options || loading}
      options={options ?? []}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Image"
          helperText={showError ? meta.error : undefined}
          error={showError}
          margin="normal"
        />
      )}
      onChange={(e, nv) => {
        imageUrl.setValue(nv!.image);
      }}
    />
  );
}
