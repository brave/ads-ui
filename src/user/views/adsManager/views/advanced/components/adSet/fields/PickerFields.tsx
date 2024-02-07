import { Typography } from "@mui/material";
import { SegmentPicker } from "components/Segment/SegmentPicker";
import { PlatformPicker } from "components/Platform/PlatformPicker";
import { CardContainer } from "components/Card/CardContainer";
import { useField } from "formik";
import { CampaignFormat } from "graphql/types";
import { useEffect } from "react";
import { SegmentFragment } from "graphql/common.generated";

interface Props {
  index: number;
}

export function PickerFields({ index }: Props) {
  const [, , helper] = useField<SegmentFragment[]>(`adSets.${index}.segments`);
  const [, format] = useField<CampaignFormat>("format");

  useEffect(() => {
    if (format.value === CampaignFormat.NewsDisplayAd) {
      helper.setValue([{ code: "Svp7l-zGN", name: "Untargeted" }]);
    }
  }, [format.value]);

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
