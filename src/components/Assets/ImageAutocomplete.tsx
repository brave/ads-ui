import { useAdvertiserImagesQuery } from "graphql/advertiser.generated";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useField } from "formik";
import { UploadImage } from "components/Assets/UploadImage";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";

type ImageOption = { label: string; image?: string };

const filter = createFilterOptions<ImageOption>();

export function ImageAutocomplete(props: { name: string }) {
  const [createImage, setCreateImage] = useState(false);
  const [, meta, imageUrl] = useField<string | undefined>(props.name);
  const hasError = Boolean(meta.error);
  const showError = hasError && meta.touched;
  const { advertiser } = useAdvertiser();
  const [options, setOptions] = useState<ImageOption[]>();
  const { data, loading } = useAdvertiserImagesQuery({
    variables: { id: advertiser.id },
  });
  const { _ } = useLingui();

  useEffect(() => {
    const images = data?.advertiser?.images ?? [];
    const options = images.map((i) => ({
      label: i.name,
      image: i.imageUrl,
    }));

    setOptions(options);
  }, [data?.advertiser?.images]);

  return (
    <>
      <Autocomplete
        disablePortal
        loading={!options || loading}
        options={options ?? []}
        renderInput={(params) => (
          <TextField
            {...params}
            label={_(msg`Image`)}
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
          return [
            ...filtered,
            { image: undefined, label: _(msg`Upload new image`) },
          ];
        }}
        onChange={async (e, nv) => {
          await imageUrl.setValue(nv ? nv.image : undefined);
          setCreateImage(nv != null && nv.image === undefined);
        }}
        isOptionEqualToValue={(option, value) => option.image === value.image}
      />

      <UploadImage
        useInlineCreation={createImage}
        onClose={() => setCreateImage(false)}
        onComplete={(url) => imageUrl.setValue(url)}
      />
    </>
  );
}
