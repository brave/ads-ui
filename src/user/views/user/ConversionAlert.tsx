import { Alert, AlertTitle, Collapse, Link } from "@mui/material";
import { Trans } from "@lingui/macro";
import { useStickyState } from "@/hooks/useStickyState";

export function ConversionAlert() {
  const [ack, setAck] = useStickyState("conversion-alert-message", true);

  return (
    <Collapse in={ack}>
      <Alert severity="warning" onClose={() => setAck(false)} sx={{ mt: 2 }}>
        <AlertTitle>
          <Trans>Conversion reporting change</Trans>
        </AlertTitle>
        <Trans>
          Conversion reporting for Brave Ads has changed to better uphold user
          privacy and security. Campaigns with conversion URLs that violate the
          newly clarified requirements for conversion URLs will now
          automatically be paused until their URLs have been updated. Please
          review the guidelines and take any necessary action to prevent
          campaign disruption. New guidelines can be found at: <GuidelineLink />
        </Trans>
      </Alert>
    </Collapse>
  );
}

function GuidelineLink() {
  const link =
    "https://ads-help.brave.com/campaign-performance/reporting/#conversion-reporting-in-brave-ads-manager";

  return (
    <Link href={link} target="_blank" rel="noreferrer" variant="inherit">
      {link}
    </Link>
  );
}
