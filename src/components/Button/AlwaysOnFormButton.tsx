import { Button } from "@mui/material";
import { useRouteMatch } from "react-router-dom";
import { Trans } from "@lingui/macro";

export function AlwaysOnFormButton() {
  const match = useRouteMatch();
  const isCreativeScreen = match.url.includes("creative");

  if (isCreativeScreen) {
    return null;
  }

  return (
    <Button
      variant="contained"
      color="primary"
      type="submit"
      size="large"
      sx={{
        width: "150px",
        borderRadius: "10px 10px 0 0",
        position: "absolute",
        bottom: 0,
        left: "90%",
      }}
      onClick={() =>
        window.open(
          "https://blocksurvey.io/ad-manager-survey-qhfFSAS8Ti6A1T.uXVJVIA?v=o",
          "_blank",
          "noopener",
        )
      }
    >
      <Trans>Feedback</Trans>
    </Button>
  );
}
