import { Typography } from "@mui/material";
import { LocationPicker } from "@/components/Location/LocationPicker";
import { CardContainer } from "@/components/Card/CardContainer";
import { Trans } from "@lingui/macro";

export function LocationField() {
  return (
    <CardContainer header={<Trans>Location</Trans>}>
      <Typography variant="body2" gutterBottom>
        <Trans>
          Select the geographic regions where your ads will be shown.
        </Trans>
      </Typography>
      <LocationPicker />
    </CardContainer>
  );
}
