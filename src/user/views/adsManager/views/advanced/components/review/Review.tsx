import { useFormikContext } from "formik";
import { CampaignForm } from "../../../../types";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { CampaignReview } from "./components/CampaignReview";
import { AdSetReview } from "./components/AdSetReview";

export function Review() {
  const { values, errors, setTouched } = useFormikContext<CampaignForm>();

  useEffect(() => {
    const toTouch = Object.keys(values)
      .map((v) => ({ [`${v}`]: true }))
      .reduce((a, b) => ({ ...a, ...b }));
    setTouched(toTouch, false);
  }, [values]);

  return (
    <Box display="flex" flexDirection="column" flexGrow={1}>
      <CampaignReview values={values} errors={errors} />

      {values.adSets.map((adSet, adSetIdx) => (
        <AdSetReview
          key={`adSetReview-${adSetIdx}`}
          idx={adSetIdx}
          adSet={adSet}
          errors={errors.adSets?.[adSetIdx]}
        />
      ))}
    </Box>
  );
}
