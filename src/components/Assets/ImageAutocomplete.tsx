import { useAdvertiserImagesQuery } from "graphql/advertiser.generated";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { useState } from "react";
import { useField } from "formik";

type ImageOption = { label: string; image?: string };

const filter = createFilterOptions<ImageOption>();

export function ImageAutocomplete() {
  const [, meta, imageUrl] = useField<string | undefined>(
    `newCreative.payloadInlineContent.imageUrl`,
  );
  const hasError = Boolean(meta.error);
  const showError = hasError && meta.touched;
  const { advertiser } = useAdvertiser();
  const [options, setOptions] = useState<ImageOption[]>();
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
      value={{
        label: options?.find((o) => o.image === meta.value)?.label ?? "",
        image: meta.value,
      }}
      getOptionLabel={(o) => o.label}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return [...filtered, { image: undefined, label: `Upload new image` }];
      }}
      onChange={(e, nv) => {
        imageUrl.setValue(nv ? nv.image : undefined);
      }}
    />
  );
}
