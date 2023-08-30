import { Box, Link, Skeleton } from "@mui/material";
import { useGetImagePreviewUrl } from "components/Assets/hooks/useGetImagePreviewUrl";
import { ErrorDetail } from "components/Error/ErrorDetail";

interface Props {
  url: string;
  height?: number;
  width?: number;
}

export const ImagePreview = ({ url, height = 300, width = 360 }: Props) => {
  const { data, loading, error } = useGetImagePreviewUrl({ url });

  if (!data || loading) {
    return <Skeleton variant="rectangular" height={height} />;
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
        <img height={height} width={width} src={data} alt="preview" />
      ) : (
        <Link underline="none" href={url} target="_blank" rel="noreferrer">
          <img
            height={height}
            width={width}
            src={data}
            alt="Image failed to load"
          />
        </Link>
      )}
    </Box>
  );
};
