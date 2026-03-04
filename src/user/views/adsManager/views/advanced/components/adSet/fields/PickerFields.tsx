import { LearnMoreButton } from "@/components/Button/LearnMoreButton";
import { CardContainer } from "@/components/Card/CardContainer";
import { PlatformPicker } from "@/components/Platform/PlatformPicker";
import { SegmentPicker } from "@/components/Segment/SegmentPicker";
import { CampaignFormat, SegmentFragment } from "@/graphql-client/graphql";
import { Typography } from "@mui/material";
import { useField } from "formik";
import { useEffect } from "react";

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
  }, [format.value, helper]);

  return (
    <CardContainer header="Targeting">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Select the interest segments and platforms you would like to target.{" "}
        <LearnMoreButton helpSection="campaign-performance/targeting" />
      </Typography>
      {format.value !== CampaignFormat.NewsDisplayAd && (
        <SegmentPicker idx={index} />
      )}

      <PlatformPicker idx={index} />
    </CardContainer>
  );
}
