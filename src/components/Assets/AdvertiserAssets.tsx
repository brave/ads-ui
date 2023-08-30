import {
  AdvertiserImageFragment,
  useAdvertiserImagesQuery,
} from "graphql/advertiser.generated";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import {
  ColumnDescriptor,
  EnhancedTable,
  StandardRenderers,
} from "components/EnhancedTable";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { CardContainer } from "components/Card/CardContainer";
import { Box, Skeleton } from "@mui/material";
import MiniSideBar from "components/Drawer/MiniSideBar";
import { UploadImage } from "components/Assets/UploadImage";
import { ImagePreview } from "components/Assets/ImagePreview";

export function AdvertiserAssets() {
  const { advertiser } = useAdvertiser();
  const { data, loading, error } = useAdvertiserImagesQuery({
    variables: { id: advertiser.id },
  });

  const options: ColumnDescriptor<AdvertiserImageFragment>[] = [
    {
      title: "Created",
      value: (c) => c.createdAt,
      renderer: StandardRenderers.date,
    },
    {
      title: "Name",
      value: (c) => c.name,
    },
    {
      title: "Image",
      value: (c) => c.imageUrl,
      extendedRenderer: (r) => <ImagePreview url={r.imageUrl} />,
    },
  ];

  return (
    <MiniSideBar>
      <CardContainer header="Assets" sx={{ minWidth: "50%" }}>
        {loading && (
          <Box m={3}>
            <Skeleton variant="rounded" height={500} />
          </Box>
        )}
        {error && (
          <ErrorDetail
            error={error}
            additionalDetails="Unable to retrieve images"
          />
        )}
        {!loading && !error && (
          <EnhancedTable
            rows={data?.advertiser?.images ?? []}
            columns={options}
          />
        )}
      </CardContainer>
      <UploadImage />
    </MiniSideBar>
  );
}
