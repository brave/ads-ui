import { Link, Stack, Typography } from "@mui/material";

interface Props {
  error?: string;
}

export function AdvertiserRegistered({ error }: Props) {
  return (
    <>
      {error ? (
        <Stack direction="column" alignItems="center" sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ textAlign: "left", mb: 5 }}>
            We encountered a problem creating your account.
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "left", mb: 5 }}>
            Please reach out to
            <Link sx={{ ml: 1 }} href="mailto:selfserve@brave.com">
              selfserve@brave.com
            </Link>{" "}
            or try again.
          </Typography>

          <Link
            variant="h5"
            sx={{ textAlign: "center" }}
            underline="none"
            href=""
          >
            Try again
          </Link>
        </Stack>
      ) : (
        <Stack direction="column" alignItems="center">
          <Typography variant="h5" sx={{ mb: 3 }}>
            Thanks for your interest in Brave Ads! Our team will now carefully
            review the provided information.
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Once the review process is complete, we will send you an email to
            notify you of the approval status and any further steps required.
          </Typography>
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            In the meantime, check out our{" "}
            <Link
              href="https://brave.com/brave-ads"
              variant="h5"
              target="_blank"
            >
              advertiser resources
            </Link>
            . If you have any questions, please reach out to{" "}
            <Link href="mailto:selfserve@brave.com">selfserve@brave.com</Link>.
          </Typography>
        </Stack>
      )}
    </>
  );
}
