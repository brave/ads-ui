import {
  CreativeFragment,
  useAdvertiserCreativesQuery,
} from "graphql/creative.generated";
import { uiTextForCreativeTypeCode } from "user/library";
import { CardContainer } from "components/Card/CardContainer";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { ErrorDetail } from "components/Error/ErrorDetail";
import MiniSideBar from "components/Drawer/MiniSideBar";
import { Box, Chip, Grid, Skeleton } from "@mui/material";
import moment from "moment";
import { ReviewField } from "user/views/adsManager/views/advanced/components/review/components/ReviewField";
import { ImagePreview } from "components/Assets/ImagePreview";
import { Status } from "components/Campaigns/Status";

const ALLOWED_TYPES = ["notification_all_v1", "inline_content_all_v1"];

export function CreativeList() {
  const { advertiser } = useAdvertiser();
  const { data, error, loading } = useAdvertiserCreativesQuery({
    variables: {
      advertiserId: advertiser.id,
    },
    pollInterval: 60_000,
  });

  if (error)
    return (
      <ErrorDetail error={error} additionalDetails="Unable to get creatives" />
    );

  if (loading) {
    return (
      <MiniSideBar>
        <CardContainer
          header="Creatives"
          sx={{
            flexGrow: 1,
            mr: 2,
          }}
        >
          <Skeleton variant="rounded" height={500} />
        </CardContainer>
      </MiniSideBar>
    );
  }

  return (
    <MiniSideBar>
      {error && (
        <ErrorDetail
          error={error}
          additionalDetails="Unable to retrieve images"
        />
      )}
      {!loading && !error && (
        <Grid container spacing={2}>
          {[...(data?.advertiser?.creatives ?? [])]
            .sort(
              (a, b) => moment(b.createdAt).date() - moment(a.createdAt).date(),
            )
            .filter((c) => ALLOWED_TYPES.includes(c.type.code))
            .map((i, idx) => (
              <Grid item xs="auto" key={idx}>
                <CreativeItem creative={i} />
              </Grid>
            ))}
        </Grid>
      )}
    </MiniSideBar>
  );
}

const CreativeItem = (props: { creative: CreativeFragment }) => {
  const { name, payloadNotification, payloadInlineContent, state, type } =
    props.creative;
  const BoxHeader = () => (
    <Box display="flex" gap="10px">
      {name}
      <TypeChip code={type.code} />
      <Status state={state} />
    </Box>
  );

  return (
    <CardContainer header={<BoxHeader />}>
      <ReviewField
        caption={"Title"}
        value={payloadNotification?.title ?? payloadInlineContent?.title}
      />
      <ReviewField caption={"Body"} value={payloadNotification?.body} />
      <ReviewField
        caption={"Call To Action"}
        value={payloadInlineContent?.ctaText}
      />
      <ReviewField
        caption={"Description"}
        value={payloadInlineContent?.description}
      />
      <ReviewField
        caption={"Target URL"}
        value={
          payloadNotification?.targetUrl ?? payloadInlineContent?.targetUrl
        }
      />
      {payloadInlineContent?.imageUrl && (
        <ImagePreview
          url={payloadInlineContent?.imageUrl ?? ""}
          width={250}
          height={150}
        />
      )}
    </CardContainer>
  );
};

const TypeChip = (props: { code?: string }) => {
  const { code } = props;
  if (!code) {
    return null;
  }

  return (
    <Chip
      label={uiTextForCreativeTypeCode({ code })}
      size="small"
      sx={{
        fontSize: "0.7rem",
      }}
    />
  );
};
