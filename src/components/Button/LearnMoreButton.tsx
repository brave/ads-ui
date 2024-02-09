import { Link } from "@mui/material";
import { useTrackMatomoEvent } from "hooks/useTrackWithMatomo";

export function LearnMoreButton(props: { helpSection: string }) {
  const url = `https://ads-help.brave.com/${props.helpSection}`;
  const { trackMatomoEvent } = useTrackMatomoEvent();

  return (
    <Link
      variant="inherit"
      underline="none"
      sx={{ cursor: "pointer" }}
      onClick={() => {
        trackMatomoEvent("learn-more", `open-${props.helpSection}`);
        window.open(url, "__blank", "noopener");
      }}
    >
      {" "}
      Learn More
    </Link>
  );
}
