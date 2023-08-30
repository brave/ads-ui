import { Box, Card, Skeleton, Typography } from "@mui/material";
import { ImagePreview } from "components/Assets/ImagePreview";
import { useField } from "formik";
import { Creative } from "user/views/adsManager/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";

export function NewsPreview() {
  const { advertiser } = useAdvertiser();
  const [, creative] = useField<Creative>("newCreative");

  const value = creative.value.payloadInlineContent;
  return (
    <Card
      sx={{
        bgcolor: "rgba(53, 53, 53, 0.47)",
        display: "flex",
        flexDirection: "column",
        maxHeight: "900px",
        maxWidth: "750px",
      }}
    >
      <Box display="flex" justifyContent="center">
        {value?.imageUrl ? (
          <ImagePreview url={value.imageUrl} height={500} width={600} />
        ) : (
          <Box width={600}>
            <Skeleton
              variant="rectangular"
              height={500}
              sx={{ bgcolor: "grey.400" }}
            />
          </Box>
        )}
      </Box>
      <Box padding="25px 35px" bgcolor="rgba(53, 53, 53, 0.47)">
        <Box display="flex" flexDirection="row" mb={1} gap={2}>
          <Typography color="#ffff" fontSize="22px" fontWeight={500}>
            {value?.title ??
              "This is a news display Ad, it wll look like part of the news feed."}
          </Typography>
          <Box
            width="200px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              color="#ffff"
              border="1px solid #ffff"
              padding="10px 15px"
              borderRadius="100px"
            >
              {value?.ctaText ?? "Click Here!"}
            </Box>
          </Box>
        </Box>
        <Typography color="#ffff" fontSize="14px" fontWeight={500}>
          {value?.description ?? advertiser.name}
        </Typography>
      </Box>
    </Card>
  );
}
