import { Box, Card, Typography } from "@mui/material";
import { ImagePreview } from "components/Assets/ImagePreview";
import { useField, useFormikContext } from "formik";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { CreativeInput } from "graphql/types";
import { Trans } from "@lingui/macro";

export function NewsPreview() {
  const { advertiser } = useAdvertiser();
  const { values } = useFormikContext<CreativeInput>();
  const [, meta, ,] = useField<CreativeInput>("newCreative");

  const value = values.payloadInlineContent ?? meta.value.payloadInlineContent;
  return (
    <Card
      sx={{
        bgcolor: "rgba(53, 53, 53, 0.47)",
        display: "flex",
        flexDirection: "column",
        height: "525px",
        width: "600px",
      }}
    >
      <Box display="flex" justifyContent="center">
        {value?.imageUrl ? (
          <ImagePreview url={value.imageUrl} height={400} width={500} />
        ) : (
          <Box height={400} width={500} />
        )}
      </Box>
      <Box
        padding="20px 25px"
        bgcolor="rgba(53, 53, 53, 0.47)"
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flexDirection="row"
          mb={1}
          gap={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            color="#ffff"
            fontSize="16px"
            fontWeight={500}
            maxWidth={400}
          >
            {value?.title || (
              <Trans>
                This is a news display ad, it wll look like part of the news
                feed.
              </Trans>
            )}
          </Typography>
          <Box
            width="200px"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Box
              color="#ffff"
              border="1px solid #ffff"
              padding="8px 10px"
              minWidth="100px"
              textAlign="center"
              borderRadius="100px"
            >
              <Typography fontSize="14px">
                {value?.ctaText || <Trans>Click Here!</Trans>}
              </Typography>
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
