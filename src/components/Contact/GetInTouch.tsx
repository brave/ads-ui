import { Box, Button, Typography } from "@mui/material";

const SALES_EMAIL = "searchads@brave.com";

/**
 * Prompts for the details sales needs before they can usefully reply. Kept in
 * one place so every "get in touch" entry point asks for the same things.
 */
const INQUIRY_BODY = [
  "Please fill in the details below so we can route your inquiry to the right team.",
  "",
  "Company name:",
  "Website:",
  "Country:",
  "",
  "Total campaign budget (please delete the options that don't apply):",
  "  - Less than $10,000",
  "  - $10,000 - $50,000",
  "  - $50,000 - $100,000",
  "  - More than $100,000",
  "",
  "Which ad placements are you interested in?",
  "  - Search ads",
  "  - Browser ads",
  "",
  "Anything else we should know:",
  "",
].join("\n");

export function inquiryMailto(subject: string) {
  const params = new URLSearchParams({ subject, body: INQUIRY_BODY });
  // URLSearchParams encodes spaces as "+", which mail clients render literally.
  return `mailto:${SALES_EMAIL}?${params.toString().replace(/\+/g, "%20")}`;
}

interface Props {
  heading: string;
  /** Email subject line, so sales can tell which page the inquiry came from. */
  subject: string;
}

export function GetInTouch({ heading, subject }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      mb={{ xs: 5, md: 10 }}
    >
      <Typography variant="h3" color="white" gutterBottom>
        {heading}
      </Typography>
      <Button
        variant="contained"
        href={inquiryMailto(subject)}
        size="large"
        sx={{ pl: 4, pr: 4, pt: 1, pb: 1 }}
      >
        {SALES_EMAIL}
      </Button>
    </Box>
  );
}
