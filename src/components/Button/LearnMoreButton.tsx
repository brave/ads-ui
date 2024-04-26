import { Link } from "@mui/material";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { Trans } from "@lingui/macro";
import { TypographyOwnProps } from "@mui/material/Typography";

export function LearnMoreButton(props: {
  helpSection: string;
  variant?: TypographyOwnProps["variant"];
}) {
  const url = `https://ads-help.brave.com/${props.helpSection}`;
  const { trackMatomoEvent } = useTrackMatomoEvent();

  return (
    <Link
      variant={props.variant ?? "inherit"}
      underline="none"
      sx={{ cursor: "pointer" }}
      onClick={() => {
        trackMatomoEvent("learn-more", `open-${props.helpSection}`);
        window.open(url, "__blank", "noopener");
      }}
    >
      <Trans>Learn More</Trans>
    </Link>
  );
}
