import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Button } from "@mui/material";

export function NewImageButton(props: { onClick: () => void }) {
  const { advertiser } = useAdvertiser();

  if (!advertiser.selfServiceCreate) {
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
      Upload Image
    </Button>
  );
}
