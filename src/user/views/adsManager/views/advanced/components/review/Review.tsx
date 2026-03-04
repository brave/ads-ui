import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { PaymentMethodField } from "@/user/views/adsManager/views/advanced/components/campaign/fields/PaymentMethodField";
import { Box, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { CampaignForm } from "../../../../types";
import { AdSetReview } from "./components/AdSetReview";
import { CampaignReview } from "./components/CampaignReview";

export function Review() {
  const { values, errors } = useFormikContext<CampaignForm>();
  useTrackMatomoPageView({ documentTitle: "Campaign Review" });

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

      <PaymentMethodField />

      <Typography variant="caption">
        <strong>*</strong>
        New campaigns typically take up to 48 hours to review during a regular
        U.S. business week.
      </Typography>
    </Box>
  );
}
