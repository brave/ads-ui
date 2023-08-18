import { CardContainer } from "components/Card/CardContainer";
import { useRecentlyCreatedAdSetAds } from "user/hooks/useAdvertiserCreatives";
import { NotificationSelect } from "components/Creatives/NotificationSelect";
import { Typography } from "@mui/material";

interface Props {
  index: number;
}

export function AdSetAds({ index }: Props) {
  const creatives = useRecentlyCreatedAdSetAds();

  return (
    <CardContainer header="Ads">
      <Typography variant="body2" sx={{ mb: 3 }}>
        Select the Ads you would like to include in this ad set.
      </Typography>

      <NotificationSelect
        options={creatives}
        fieldName={`adSets.${index}.creatives`}
      />
    </CardContainer>
  );
}
