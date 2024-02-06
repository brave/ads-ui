import { Link } from "@mui/material";

export function LearnMoreButton(props: { helpSection: string }) {
  const url = `https://ads-help.brave.com/${props.helpSection}`;

  return (
    <Link
      variant="inherit"
      underline="none"
      sx={{ cursor: "pointer" }}
      onClick={() => window.open(url, "__blank", "noopener")}
    >
      {" "}
      Learn More
    </Link>
  );
}
