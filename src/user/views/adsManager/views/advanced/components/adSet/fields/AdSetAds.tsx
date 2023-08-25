import { CardContainer } from "components/Card/CardContainer";
import { Typography } from "@mui/material";
import { CampaignForm, Creative } from "user/views/adsManager/types";
import { useFormikContext } from "formik";
import { CampaignFormat } from "graphql/types";
import { NotificationSelect } from "components/Creatives/NotificationSelect";
import _ from "lodash";
import { useEffect, useRef } from "react";

interface Props {
  index: number;
}

export function AdSetAds({ index }: Props) {
  const { values } = useFormikContext<CampaignForm>();
  const currCreatives = useRef<Creative[]>([]);
  useEffect(() => {
    currCreatives.current = values.adSets[index].creatives ?? [];
  }, [index]);

  const options = _.map(values.creatives, (v) => {
    const found = _.find(currCreatives.current, (c) => c.id === v.id);
    return found ?? v;
  });

  return (
    <CardContainer header="Ads">
      <Typography variant="body2" sx={{ mb: 3 }}>
        Select the Ads you would like to include in this ad set.
      </Typography>

      {values.format === CampaignFormat.PushNotification && (
        <NotificationSelect
          options={options}
          fieldName={`adSets.${index}.creatives`}
        />
      )}
    </CardContainer>
  );
}
