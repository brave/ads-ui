import { Link, Stack, Typography } from "@mui/material";
import { useTrackMatomoPageView } from "hooks/useTrackWithMatomo";
import { Trans } from "@lingui/macro";

interface Props {
  error?: string;
}

export function AdvertiserRegistered({ error }: Props) {
  useTrackMatomoPageView({ documentTitle: "Advertiser Registered" });

  return (
    <>
      {error ? (
        <Stack direction="column" alignItems="center" sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ textAlign: "left", mb: 5 }}>
            <Trans>We encountered a problem creating your account.</Trans>
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "left", mb: 5 }}>
            <Trans>
              Please reach out to{" "}
              <Link sx={{ ml: 1 }} href="mailto:selfserve@brave.com">
                selfserve@brave.com
              </Link>{" "}
              or try again.
            </Trans>
          </Typography>

          <Link
            variant="h5"
            sx={{ textAlign: "center" }}
            underline="none"
            href=""
          >
            <Trans>Try again</Trans>
          </Link>
        </Stack>
      ) : (
        <Stack direction="column" alignItems="center">
          <Typography variant="h5" sx={{ mb: 3 }}>
            <Trans>
              Thanks for your interest in Brave Ads! Our team will now carefully
              review the provided information.
            </Trans>
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            <Trans>
              Once the review process is complete, we will send you an email to
              notify you of the approval status and any further steps required.
            </Trans>
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            <Trans>
              In the meantime, check out our{" "}
              <Link
                href="https://brave.com/brave-ads"
                variant="h5"
                target="_blank"
              >
                advertiser resources
              </Link>
              . If you have any questions, please reach out to{" "}
              <Link href="mailto:selfserve@brave.com">selfserve@brave.com</Link>
              .
            </Trans>
          </Typography>
        </Stack>
      )}
    </>
  );
}
