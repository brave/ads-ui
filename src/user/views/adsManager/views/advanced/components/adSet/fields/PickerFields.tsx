import { Typography } from "@mui/material";
import { SegmentPicker } from "components/Segment/SegmentPicker";
import { PlatformPicker } from "components/Platform/PlatformPicker";
import { CardContainer } from "components/Card/CardContainer";
import { useField } from "formik";
import { CampaignFormat } from "graphql/types";

interface Props {
  index: number;
}

export function PickerFields({ index }: Props) {
  const [, format] = useField<CampaignFormat>("format");

  return (
    <>
      {format.value !== CampaignFormat.NewsDisplayAd && (
        <CardContainer header="Categories">
          <Typography variant="body2" sx={{ mb: 2 }}>
            Select the audience you would like to advertise to by interests.
          </Typography>
          <SegmentPicker idx={index} />
        </CardContainer>
      )}

      <CardContainer header="Platforms">
        <Typography variant="body2" sx={{ mb: 2 }}>
          Select the devices and platforms you would like to advertise to.
        </Typography>
        <PlatformPicker idx={index} />
      </CardContainer>
    </>
  );
}
