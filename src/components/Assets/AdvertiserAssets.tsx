import {
  AdvertiserImageFragment,
  useAdvertiserImagesQuery,
} from "graphql/advertiser.generated";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { CardContainer } from "components/Card/CardContainer";
import { Grid, LinearProgress, Typography } from "@mui/material";
import MiniSideBar from "components/Drawer/MiniSideBar";
import { ImagePreview } from "components/Assets/ImagePreview";
import { CampaignFormat } from "graphql/types";
import moment from "moment/moment";
import { RouteSelectionButton } from "components/Route/RouteSelectionButton";
import Box from "@mui/material/Box";
import { useTrackMatomoPageView } from "hooks/useTrackWithMatomo";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export function AdvertiserAssets() {
  useTrackMatomoPageView({ documentTitle: "Advertiser Assets" });
  const { advertiser } = useAdvertiser();
  const { _ } = useLingui();
  const { data, loading, error } = useAdvertiserImagesQuery({
    variables: { id: advertiser.id },
    initialFetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-only",
  });

  return (
    <MiniSideBar>
      <Box display="flex" flexDirection="column" flexGrow={1}>
        <RouteSelectionButton
          routes={[
            { label: _(msg`Ads`), value: "ads" },
            { label: _(msg`Images`), value: "ads/assets" },
          ]}
        />
        {loading && <LinearProgress sx={{ mt: 1, flexGrow: 1 }} />}
        {error && (
          <ErrorDetail
            error={error}
            additionalDetails={msg`Unable to retrieve images`}
          />
        )}
        {!loading && !error && (
          <Grid container spacing={2}>
            {[...(data?.advertiser?.images ?? [])]
              .sort(
                (a, b) =>
                  moment(b.createdAt).date() - moment(a.createdAt).date(),
              )
              .map((i, idx) => (
                <Grid item xs="auto" key={idx}>
                  <GalleryItem image={i} />
                </Grid>
              ))}
          </Grid>
        )}
      </Box>
    </MiniSideBar>
  );
}

const GalleryItem = (props: { image: AdvertiserImageFragment }) => {
  const { name, imageUrl, createdAt, format } = props.image;
  const height = format === CampaignFormat.NewsDisplayAd ? 400 : undefined;
  const width = format === CampaignFormat.NewsDisplayAd ? 500 : undefined;

  return (
    <CardContainer header={name}>
      <ImagePreview url={imageUrl} height={height} width={width} />
      <Typography
        variant="caption"
        color="text.primary"
        textAlign="right"
        fontWeight={500}
      >
        <Trans>created</Trans> {moment(createdAt).fromNow()}
      </Typography>
    </CardContainer>
  );
};
