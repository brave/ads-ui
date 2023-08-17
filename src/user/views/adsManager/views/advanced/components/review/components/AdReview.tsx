import { Stack, Typography } from "@mui/material";
import { useRecentlyCreatedAdvertiserCreatives } from "user/hooks/useAdvertiserCreatives";
import { BoxContainer } from "components/Box/BoxContainer";
import { ReviewContainer } from "user/views/adsManager/views/advanced/components/review/components/ReviewContainer";
import { NotificationPreview } from "components/Creatives/NotificationPreview";

export function AdReview() {
  const creatives = useRecentlyCreatedAdvertiserCreatives();

  return (
    <ReviewContainer name="Ads" path="ads">
      {creatives.length === 0 && (
        <Typography variant="subtitle1">No Recently Created Ads</Typography>
      )}
      <Stack
        direction="row"
        justifyContent="left"
        alignItems="center"
        flexWrap="wrap"
      >
        {creatives.map((c) => (
          <BoxContainer header={c.name} key={`${c.title}_${c.body}`}>
            <NotificationPreview title={c.title} body={c.body} />
          </BoxContainer>
        ))}
      </Stack>
    </ReviewContainer>
  );
}
