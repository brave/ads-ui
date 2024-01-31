import { Box, Link, Skeleton } from "@mui/material";
import { useGetImagePreviewUrl } from "components/Assets/hooks/useGetImagePreviewUrl";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";

interface Props {
  url: string;
  height?: number;
  width?: number;
  selected?: boolean;
}

export const ImagePreview = ({
  url,
  height = 300,
  width = 360,
  selected,
}: Props) => {
  const { data, loading, error } = useGetImagePreviewUrl({ url });
  const { _ } = useLingui();

  if (!data || loading) {
    return <Skeleton variant="rectangular" height={height} width={width} />;
  }

  if (error) {
    return <ErrorDetail error={error} />;
  }

  return (
    <Box
      sx={{
        height,
        width,
        bgcolor: "#AEB1C2",
      }}
    >
      {url?.endsWith(".pad") ? (
        <img
          height={height}
          width={width}
          src={data}
          alt="preview"
          style={{
            opacity: selected === false ? 0.3 : 1,
            filter: selected === false ? "grayscale(20%)" : "none",
          }}
        />
      ) : (
        <Link underline="none" href={url} target="_blank" rel="noreferrer">
          <img
            height={height}
            width={width}
            src={data}
            alt={_(msg`Image failed to load`)}
          />
        </Link>
      )}
    </Box>
  );
};
