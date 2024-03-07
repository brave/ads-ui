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
        textDecoration: "none",
        bgcolor: "rgba(33, 39, 42, 1)",
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          bgcolor: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <Box display="flex" justifyContent="center" borderRadius="12px">
          {value?.imageUrl ? (
            <ImagePreview url={value.imageUrl} height={400} width={500} />
          ) : (
            <Box height={400} width={500} />
          )}
        </Box>
        <Box height="18px" gap="8px">
          <OutlinedAd />{" "}
          <AdDescription description={value?.description ?? advertiser.name} />
        </Box>
        <Typography
          display="flex"
          alignItems="center"
          margin={0}
          textAlign="start"
          fontWeight={600}
          fontSize="14px"
          lineHeight="22px"
          color="rgba(255, 255, 255, 1)"
        >
          {value?.title || (
            <Trans>
              This is a news display ad, it wll look like part of the news feed.
            </Trans>
          )}
        </Typography>
        <Box
          width="100px"
          height="35px"
          padding="5px, 9px, 5px, 9px"
          borderRadius="8px"
          bgcolor="rgba(104, 123, 133, 0.3)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <span style={{ fontSize: "11px", color: "#fff", fontWeight: 600 }}>
            {value?.ctaText || <Trans>Click Here!</Trans>}
          </span>
        </Box>
      </Box>
    </Card>
  );
}

const OutlinedAd = () => {
  return (
    <span
      style={{
        lineHeight: "16px",
        padding: "0px 2px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "3px",
        textDecoration: "none",
        fontSize: "11px",
        color: "rgba(255, 255, 255, 1)",
      }}
    >
      <Trans>Ad</Trans>
    </span>
  );
};

const AdDescription = (props: { description: string }) => {
  return (
    <span
      style={{
        margin: "0",
        fontWeight: "400",
        fontSize: "11px",
        lineHeight: "18px",
        color: "rgba(255, 255, 255, 0.5)",
      }}
    >
      • {props.description}
    </span>
  );
};
