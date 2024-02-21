import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Button } from "@mui/material";
import { Trans } from "@lingui/macro";

export function NewImageButton(props: { onClick: () => void }) {
  const { advertiser } = useAdvertiser();

  if (!advertiser.selfServiceManageCampaign) {
    return null;
  }

  return (
    <Button
      size="medium"
      variant="contained"
      sx={{ mr: 3 }}
      disabled={!advertiser.agreed}
      onClick={props.onClick}
    >
      <Trans>Upload Image</Trans>
    </Button>
  );
}
