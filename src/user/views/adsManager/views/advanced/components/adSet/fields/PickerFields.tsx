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
    <CardContainer header="Targeting">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Select the interest segments and platforms you would like to target.
      </Typography>
      {format.value !== CampaignFormat.NewsDisplayAd && (
        <SegmentPicker idx={index} />
      )}

      <PlatformPicker idx={index} />
    </CardContainer>
  );
}
