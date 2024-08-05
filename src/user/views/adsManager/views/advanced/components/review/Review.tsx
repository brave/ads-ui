import { useFormikContext } from "formik";
import { CampaignForm } from "../../../../types";
import { Box, Typography } from "@mui/material";
import { CampaignReview } from "./components/CampaignReview";
import { AdSetReview } from "./components/AdSetReview";
import { PaymentMethodField } from "@/user/views/adsManager/views/advanced/components/campaign/fields/PaymentMethodField";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { Trans } from "@lingui/macro";

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
          format={values.format}
          errors={errors.adSets?.[adSetIdx]}
        />
      ))}

      <PaymentMethodField />

      <Typography variant="caption">
        <strong>*</strong>
        <Trans>
          New campaigns typically take up to 48 hours to review during a regular
          U.S. business week.
        </Trans>
      </Typography>
    </Box>
  );
}
